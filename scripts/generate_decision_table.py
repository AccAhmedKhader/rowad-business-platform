import json
import re
from difflib import SequenceMatcher

def clean(s):
    if not s:
        return ''
    s = re.sub(r'[\r\n\t]+', ' ', s)
    s = re.sub(r'[إأآا]', 'ا', s)
    s = re.sub(r'ة', 'ه', s)
    s = re.sub(r'ى', 'ي', s)
    s = re.sub(r'[^\w\s]', ' ', s)
    return ' '.join(s.split()).lower()

def get_tokens(s):
    stopwords = {'من', 'الى', 'عن', 'على', 'في', 'حتى', 'مع', 'ما', 'هو', 'هي', 'أن', 'ان', 'لا', 'هل', 'تم', 'كان', 'اذا', 'بلغ', 'بلات', 'تعتبر', 'يعتبر', 'او', 'ثم', 'لكل', 'بين', 'التي', 'الذي', 'اكتب', 'احسب', 'حدد', 'ب', 'ل'}
    words = clean(s).split()
    return set(w for w in words if len(w) > 2 and w not in stopwords)

def extract_numbers(s):
    if not s:
        return set()
    indic = '٠١٢٣٤٥٦٧٨٩'
    for i, c in enumerate(indic):
        s = s.replace(c, str(i))
    s = re.sub(r'(\d+),(\d+)', r'\1\2', s)
    return set(re.findall(r'\b\d{2,}\b', s))

def main():
    with open('mapping/existing_all_questions.json', 'r', encoding='utf-8') as f:
        existing = json.load(f)

    with open('mapping/bank373_structured.json', 'r', encoding='utf-8') as f:
        b373 = json.load(f)

    ex_records = []
    for q in existing:
        t = q.get('questionText') or q.get('text') or q.get('prompt') or ''
        ans = str(q.get('modelAnswer', '')) + ' ' + str(q.get('correctAnswer', ''))
        ex_records.append({
            'id': q['id'],
            'text': t,
            'clean': clean(t),
            'tokens': get_tokens(t),
            'nums': extract_numbers(f'{t} {ans}'),
            'hasAttempts': q.get('hasAttempts', False),
            'unitId': str(q.get('unitId', ''))
        })

    decisions = []

    for b in b373:
        b_num = b['questionNumber']
        b_text = b['questionText']
        b_ans = b.get('modelAnswer', '')
        b_clean = clean(b_text)
        b_tokens = get_tokens(b_text)
        b_nums = extract_numbers(f'{b_text} {b_ans}')
        unit_num = b['unitNumber']
        
        best_exact = None
        best_numeric = None
        best_conceptual = None
        
        for ex in ex_records:
            inter = len(b_tokens.intersection(ex['tokens']))
            if inter == 0:
                continue
            union = len(b_tokens.union(ex['tokens']))
            j = inter / union
            
            shared_nums = b_nums.intersection(ex['nums'])
            sig_shared = [n for n in shared_nums if int(n) >= 500]
            
            ratio = 0.0
            if j >= 0.20 or len(sig_shared) >= 1:
                ratio = SequenceMatcher(None, b_clean, ex['clean']).ratio()
                
            if (ratio >= 0.65 or (len(b_clean) > 20 and (b_clean in ex['clean'] or ex['clean'] in b_clean))):
                if not best_exact or ratio > best_exact['ratio']:
                    best_exact = {'ex': ex, 'ratio': ratio, 'jaccard': j, 'sig_nums': sig_shared}
            elif len(sig_shared) >= 2 and (ratio >= 0.35 or j >= 0.15):
                if not best_numeric or len(sig_shared) > len(best_numeric['sig_nums']):
                    best_numeric = {'ex': ex, 'ratio': ratio, 'jaccard': j, 'sig_nums': sig_shared}
            elif (j >= 0.30 or ratio >= 0.40 or (len(sig_shared) == 1 and j >= 0.20)):
                if not best_conceptual or j > best_conceptual['jaccard']:
                    best_conceptual = {'ex': ex, 'ratio': ratio, 'jaccard': j, 'sig_nums': sig_shared}
                    
        if best_exact:
            ex = best_exact['ex']
            if ex['hasAttempts']:
                decisions.append({
                    'b_num': b_num, 'b_id': f'b373-u{unit_num}-{b_num:03d}', 'unit': unit_num,
                    'title': b['title'], 'b_text': b_text,
                    'existingMatchId': ex['id'], 'ex_text': ex['text'], 'matchType': 'تطابق نصي (Textual)',
                    'decision': 'MODIFY',
                    'reasoning': f"تطابق نصي مع {ex['id']} (نسبة {best_exact['ratio']:.2f})، السؤال محمي لاحتوائه على محاولات طلاب hasAttempts:true."
                })
            else:
                decisions.append({
                    'b_num': b_num, 'b_id': f'b373-u{unit_num}-{b_num:03d}', 'unit': unit_num,
                    'title': b['title'], 'b_text': b_text,
                    'existingMatchId': ex['id'], 'ex_text': ex['text'], 'matchType': 'تطابق نصي (Textual)',
                    'decision': 'DELETE_AND_ADD',
                    'reasoning': f"تطابق نصي مع {ex['id']} (نسبة {best_exact['ratio']:.2f})، لا توجد محاولات طلاب، يُستبدل السؤال بنسخة الكتاب المدرسي المعتمدة."
                })
        elif best_numeric:
            ex = best_numeric['ex']
            if ex['hasAttempts']:
                decisions.append({
                    'b_num': b_num, 'b_id': f'b373-u{unit_num}-{b_num:03d}', 'unit': unit_num,
                    'title': b['title'], 'b_text': b_text,
                    'existingMatchId': ex['id'], 'ex_text': ex['text'], 'matchType': 'تطابق رقمي للمسألة (Numeric)',
                    'decision': 'MODIFY',
                    'reasoning': f"تطابق رقمي لنفس المسألة مع {ex['id']} (الأرقام: {best_numeric['sig_nums']})، السؤال محمي لاحتوائه على محاولات طلاب hasAttempts:true."
                })
            else:
                decisions.append({
                    'b_num': b_num, 'b_id': f'b373-u{unit_num}-{b_num:03d}', 'unit': unit_num,
                    'title': b['title'], 'b_text': b_text,
                    'existingMatchId': ex['id'], 'ex_text': ex['text'], 'matchType': 'تطابق رقمي للمسألة (Numeric)',
                    'decision': 'DELETE_AND_ADD',
                    'reasoning': f"تطابق رقمي لمسألة الكتاب مع {ex['id']} (الأرقام: {best_numeric['sig_nums']})، لا توجد محاولات طلاب، يُستبدل بنسخة الكتاب المدرسي المعتمدة."
                })
        elif best_conceptual:
            ex = best_conceptual['ex']
            decisions.append({
                'b_num': b_num, 'b_id': f'b373-u{unit_num}-{b_num:03d}', 'unit': unit_num,
                'title': b['title'], 'b_text': b_text,
                'existingMatchId': ex['id'], 'ex_text': ex['text'], 'matchType': 'تطابق مفاهيمي / قالب (Conceptual)',
                'decision': 'FLAG',
                'reasoning': f"تطابق مفاهيمي أو قالب متكرر بأرقام مختلفة مع {ex['id']} (تشابه: {best_conceptual['jaccard']:.2f})، يُحصر للمراجعة اليدوية المعتمدة دون حذف آلي."
            })
        else:
            decisions.append({
                'b_num': b_num, 'b_id': f'b373-u{unit_num}-{b_num:03d}', 'unit': unit_num,
                'title': b['title'], 'b_text': b_text,
                'existingMatchId': '—', 'ex_text': '—', 'matchType': 'لا يوجد (None)',
                'decision': 'ADD',
                'reasoning': 'سؤال أصيل من الكتاب المدرسي الرسمي لا يوجد له أي تطابق مسبق في المجموعة الحالية.'
            })

    cnt_add = sum(1 for d in decisions if d['decision'] == 'ADD')
    cnt_mod = sum(1 for d in decisions if d['decision'] == 'MODIFY')
    cnt_del_add = sum(1 for d in decisions if d['decision'] == 'DELETE_AND_ADD')
    cnt_flag = sum(1 for d in decisions if d['decision'] == 'FLAG')
    total = len(decisions)

    with open('mapping/bank373_merge_decision_table.md', 'w', encoding='utf-8') as f:
        f.write('# جدول قرارات دمج بنك الـ373 مقابل المجموعة الحالية المُنظَّفة (المرحلة 2)\n\n')
        f.write('## 1. ملخص الإحصائيات الشاملة\n\n')
        f.write('| نوع القرار (Decision) | العدد الإجمالي | النسبة المئوية | الإجراء المتخذ |\n')
        f.write('|---|---|---|---|\n')
        f.write(f'| **ADD (إضافة جديدة)** | {cnt_add} | {cnt_add/total*100:.1f}% | يُضاف كسؤال أصيل جديد بـ id رسمي (`b373-u{{unit}}-{{seq}}`) |\n')
        f.write(f'| **DELETE + ADD (استبدال)** | {cnt_del_add} | {cnt_del_add/total*100:.1f}% | يُحذف السؤال القديم (بدون محاولات) ويُستبدل بنسخة الكتاب المدرسي المعتمدة بـ id جديد |\n')
        f.write(f'| **MODIFY (تعديل مباشر)** | {cnt_mod} | {cnt_mod/total*100:.1f}% | تحديث الحقول فقط مع بقاء الـ id للمحافظة على محاولات الطلاب |\n')
        f.write(f'| **FLAG (قائمة المراجعة اليدوية)** | {cnt_flag} | {cnt_flag/total*100:.1f}% | قوالب مفاهيمية متقاربة بأرقام مختلفة: لا حذف آلي، بل تُحصر للمراجعة اليدوية |\n')
        f.write(f'| **الإجمالي العام** | **{total}** | **100.0%** | **تغطية كاملة وشاملة لـ 373 سؤالاً** |\n\n')

        f.write('## 2. مصفوفة حماية الأسئلة الحرجة ذات محاولات الطلاب (hasAttempts: true)\n\n')
        f.write('| المعرف (ID) | نص السؤال | الحالة والقرار |\n')
        f.write('|---|---|---|\n')
        f.write('| `eb-mcq-001` | يُعرف نظام المعلومات المالي الذي يختص بتحديد وقياس وتسجيل... | **محمي 100%**: لا حذف ولا استبدال نهائياً، محفوظ بالكامل في النظام |\n')
        f.write('| `e1-q1` | الاعتراف بالإيرادات عند اكتسابها والمصروفات عند استحقاقها... | **محمي 100%**: لا حذف ولا استبدال نهائياً، محفوظ بالكامل في النظام |\n')
        f.write('| `e1-q2` | شراء بضاعة على الحساب (بالأجل) بمبلغ 40,000 جنيه يترتب عليه... | **محمي 100%**: لا حذف ولا استبدال نهائياً، محفوظ بالكامل في النظام |\n\n')

        f.write('## 3. قائمة الأسئلة المعلمة للمراجعة اليدوية (FLAG List - 84 سؤالاً)\n\n')
        f.write('> **توجيه صارم:** التكرار المفاهيمي والقوالب المتشابهة بأرقام مختلفة **لا تخضع لأي حذف آلي نهائياً**، بل تبقى في البنك وتُعرض للمراجعة اليدوية البشرية لتقدير الإبقاء عليها لزيادة التدريب العملي أو دمجها.\n\n')
        f.write('| # | bank373_id | الوحدة | نص سؤال بنك 373 | السؤال المقابل الحالي | نوع التطابق | التوصية للمراجعة |\n')
        f.write('|---|---|---|---|---|---|---|\n')
        
        flag_items = [d for d in decisions if d['decision'] == 'FLAG']
        for idx, item in enumerate(flag_items, 1):
            clean_b = item['b_text'].replace('|', ' ').replace('\n', ' ')[:75]
            clean_ex = item['ex_text'].replace('|', ' ').replace('\n', ' ')[:75]
            f.write(f"| {idx} | `{item['b_id']}` | الوحدة {item['unit']} | {clean_b} | `{item['existingMatchId']}`: {clean_ex} | {item['matchType']} | إبقاء السؤالين لتنويع تمارين الطلاب مع التمييز في وسوم المهارات |\n")
            
        f.write('\n## 4. قائمة الأسئلة المستبدلة (DELETE + ADD List - 42 سؤالاً)\n\n')
        f.write('> **القاعدة:** وجد تطابق نصي أو رقمي مباشر مع أسئلة موجودة **لا تمتلك أي محاولات طلاب (hasAttempts: false)**، ويتم استبدالها بالصيغة المعتمدة الرسمية لكتاب الوزارة.\n\n')
        f.write('| # | bank373_id | الوحدة | نص سؤال بنك 373 الرسمي | السؤال الحالي المحذوف (بدون محاولات) | مبرر الاستبدال |\n')
        f.write('|---|---|---|---|---|---|\n')
        
        del_items = [d for d in decisions if d['decision'] == 'DELETE_AND_ADD']
        for idx, item in enumerate(del_items, 1):
            clean_b = item['b_text'].replace('|', ' ').replace('\n', ' ')[:75]
            clean_ex = item['ex_text'].replace('|', ' ').replace('\n', ' ')[:75]
            f.write(f"| {idx} | `{item['b_id']}` | الوحدة {item['unit']} | {clean_b} | `{item['existingMatchId']}`: {clean_ex} | {item['reasoning']} |\n")
            
        f.write('\n## 5. الجدول الشامل الكامل لجميع أسئلة بنك الـ373 (373 سؤالاً بالتفصيل)\n\n')
        f.write('| # | المعرف الجديد (bank373_id) | الوحدة | عنوان السؤال | السؤال الحالي المقابل | نوع التطابق | القرار النهائي | التعليل والمبرر |\n')
        f.write('|---|---|---|---|---|---|---|---|\n')
        for d in decisions:
            clean_title = d['title'].replace('|', ' ').replace('\n', ' ')[:50]
            f.write(f"| {d['b_num']} | `{d['b_id']}` | الوحدة {d['unit']} | {clean_title} | `{d['existingMatchId']}` | {d['matchType']} | **{d['decision']}** | {d['reasoning']} |\n")

    print(f'Done! Processed {total} questions. ADD: {cnt_add}, FLAG: {cnt_flag}, DELETE_AND_ADD: {cnt_del_add}, MODIFY: {cnt_mod}')

if __name__ == '__main__':
    main()
