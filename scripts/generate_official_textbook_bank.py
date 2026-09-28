import json
import re
import os

# 1. Parse replacements from decision table
with open("mapping/bank373_merge_decision_table.md", "r") as f:
    table_text = f.read()

lines = table_text.split("\n")
in_del = False
replacements = {} # b373_id -> target_id
for line in lines:
    if "## 4. قائمة الأسئلة المستبدلة" in line:
        in_del = True
        continue
    if in_del and line.startswith("## 5."):
        break
    if in_del and line.strip().startswith("|") and not line.strip().startswith("| #") and not line.strip().startswith("|---"):
        parts = [p.strip() for p in line.split("|")]
        if len(parts) >= 6:
            bid = parts[2].strip("` ")
            del_raw = parts[5]
            m = re.search(r"`([^`]+)`", del_raw)
            target_del = m.group(1) if m else del_raw.split()[0].strip("` ")
            replacements[bid] = target_del

print(f"Loaded {len(replacements)} replacement entries.")

# 2. Load 373 items
with open("mapping/bank373_structured.json", "r") as f:
    items_373 = json.load(f)

# Document mapping
doc_map = {
    1: "Accuonting-Ar-EB-Part1.pdf",
    2: "Accuonting-Ar-EB-Part1.pdf",
    3: "الوحدة_الثالثة_-_محاسبة_-_بكالوريا.pdf",
    4: "الوحدة_الرابعة_-_محاسبة_-_بكالوريا.pdf",
    5: "الوحدة_الخامسة_-_محاسبة_-_بكالوريا.pdf",
    6: "الوحدة_السادسة_-_محاسبة_-_بكالوريا.pdf",
    7: "الوحدة_السابعة_-_محاسبة_-_بكالوريا.pdf",
    8: "الوحدة_الثامنة_-_محاسبة_-_بكالوريا.pdf",
    9: "الوحدة_التاسعة_-_محاسبة_-_بكالوريا.pdf",
    10: "الوحدة_العاشرة_-_محاسبة_-_بكالوريا.pdf"
}

def clean_arabic_text(txt):
    if not txt:
        return ""
    return txt.strip().replace("\r\n", "\n")

processed_373 = []
for item in items_373:
    qnum = item["questionNumber"]
    unum = item["unitNumber"]
    qid = f"b373-u{unum}-{qnum:03d}"
    
    # Check if this question replaced an older question
    target_replaced = replacements.get(qid, None)
    
    qtype_raw = item.get("questionType", "")
    qtext = clean_arabic_text(item.get("questionText", ""))
    model_ans = clean_arabic_text(item.get("modelAnswer", ""))
    explanation = clean_arabic_text(item.get("explanation", ""))
    title = clean_arabic_text(item.get("title", ""))
    
    # Determine lessonId
    lo_raw = item.get("learningObjectives", "")
    lo_num = re.search(r"\d+", lo_raw)
    l_idx = int(lo_num.group(0)) if lo_num else 1
    if l_idx > 6:
        l_idx = 6
    if l_idx < 1:
        l_idx = 1
        
    if unum == 1:
        lesson_id = f"lesson-{l_idx}"
        lo_id = f"obj-1-{l_idx}"
    elif unum == 2:
        lesson_id = f"u2-lesson-{l_idx}"
        lo_id = f"obj-2-{l_idx}"
    else:
        lesson_id = f"lesson-{unum}-{l_idx}"
        lo_id = f"LO-U{unum}.{l_idx}"
        
    # Question type & options
    options = None
    distractors = None
    correct_answer = model_ans
    
    is_mcq = False
    if ("اختيار" in qtype_raw or "اختر" in qtype_raw) or ("(أ)" in qtext and "(ب)" in qtext and "(ج)" in qtext):
        is_mcq = True
        
    if is_mcq and "(أ)" in qtext and "(ب)" in qtext:
        m = re.split(r"\([أ-ي]\)", qtext)
        prompt = m[0].strip()
        opts = [o.strip() for o in m[1:] if o.strip()]
        if len(opts) >= 3:
            question_type = "mcq"
            question = prompt
            options = opts
            # Try to match answer letter
            ans_clean = model_ans.replace("*", "").strip()
            # If answer mentions (أ) or similar
            letter_match = re.search(r"\(([أ-ي])\)", ans_clean)
            if letter_match:
                letter = letter_match.group(1)
                idx_map = {"أ": 0, "ب": 1, "ج": 2, "د": 3}
                opt_idx = idx_map.get(letter, -1)
                if 0 <= opt_idx < len(opts):
                    correct_answer = opts[opt_idx]
            distractors = [o for o in opts if o != correct_answer]
        else:
            question_type = "applied"
            question = qtext
    elif "صح أو خطأ" in qtype_raw or "صح وخطأ" in qtype_raw:
        question_type = "true_false"
        question = qtext
        if "خطأ" in model_ans:
            correct_answer = False
        elif "صح" in model_ans:
            correct_answer = True
    elif "JRE" in title or "مقال التفسير" in qtype_raw or "JRE" in qtype_raw:
        question_type = "jre"
        question = qtext
    elif "ترصيد" in qtype_raw or "حساب الأستاذ" in qtype_raw or "T-Account" in title:
        question_type = "t_account"
        question = qtext
    elif "دراسة حالة" in title or "سياقية" in qtype_raw:
        question_type = "case"
        question = qtext
    elif "تحليلي" in qtype_raw or "تفكير نقدي" in qtype_raw:
        question_type = "analytical"
        question = qtext
    elif "مقالي" in qtype_raw:
        question_type = "essay"
        question = qtext
    elif "تطبيقي" in qtype_raw or "مسألة" in qtype_raw or "قيد" in qtype_raw:
        question_type = "applied"
        question = qtext
    else:
        question_type = "concept"
        question = qtext

    # Bloom level
    bloom_raw = item.get("bloomLevel", "")
    if "تذكر" in bloom_raw or "knowledge" in bloom_raw:
        bloom = "knowledge"
        diff = "basic"
    elif "فهم" in bloom_raw or "استيعاب" in bloom_raw:
        bloom = "comprehension"
        diff = "basic"
    elif "تطبيق" in bloom_raw:
        bloom = "application"
        diff = "intermediate"
    elif "تحليل" in bloom_raw:
        bloom = "analysis"
        diff = "advanced"
    elif "تركيب" in bloom_raw:
        bloom = "synthesis"
        diff = "advanced"
    elif "تقييم" in bloom_raw:
        bloom = "evaluation"
        diff = "challenge"
    else:
        bloom = "application"
        diff = "intermediate"
        
    page = int(re.search(r"\d+", item.get("page", "1")).group(0)) if re.search(r"\d+", item.get("page", "1")) else 1
    doc = doc_map.get(unum, "Accuonting-Ar-EB-Part1.pdf")
    
    q_obj = {
        "id": qid,
        "sourceQuestionId": qid,
        "originalId": target_replaced or qid,
        "lessonId": lesson_id,
        "unitId": f"unit-{unum}",
        "learningObjectiveId": lo_id,
        "concept": title,
        "difficulty": diff,
        "questionType": question_type,
        "bloomLevel": bloom,
        "question": question,
        "correctAnswer": correct_answer,
        "modelAnswer": model_ans,
        "explanation": explanation or model_ans,
        "sourceType": "official_textbook",
        "sourcePage": page,
        "sourceDocument": doc,
        "sourceMapping": {
            "source_document": doc,
            "source_page": page,
            "concept": title
        },
        "tags": [item.get("unitTitle", ""), item.get("lesson", ""), qtype_raw]
    }
    if options:
        q_obj["options"] = options
    if distractors:
        q_obj["distractors"] = distractors
    if target_replaced:
        q_obj["replacesQuestionId"] = target_replaced
        
    processed_373.append(q_obj)

print(f"Processed {len(processed_373)} bank373 questions.")
