import json
import re
import os

with open("mapping/official_textbook_bank_373.json", "r", encoding="utf-8") as f:
    bank373 = json.load(f)

# Load Unit 1 from expandedQuestionBank.ts
with open("src/data/expandedQuestionBank.ts", "r", encoding="utf-8") as f:
    eqb_text = f.read()

# Load Unit 2 from unit2Questions.ts
with open("src/data/unit2Questions.ts", "r", encoding="utf-8") as f:
    u2_text = f.read()

# Load unit3 to unit8 from core banks
with open("src/data/unit3CoreBank.ts", "r", encoding="utf-8") as f:
    u3_text = f.read()
with open("src/data/unit4CoreBank.ts", "r", encoding="utf-8") as f:
    u4_text = f.read()
with open("src/data/unit5CoreBank.ts", "r", encoding="utf-8") as f:
    u5_text = f.read()
with open("src/data/unit6CoreBank.ts", "r", encoding="utf-8") as f:
    u6_text = f.read()
with open("src/data/unit7CoreBank.ts", "r", encoding="utf-8") as f:
    u7_text = f.read()
with open("src/data/unit8CoreBank.ts", "r", encoding="utf-8") as f:
    u8_text = f.read()

# Replaced IDs from decision table
replaced_in_u3 = {"U3-Q16"}
replaced_in_u4 = {"U4-Q09", "U4-Q17"}
replaced_in_u5 = {"U5-Q10", "U5-Q21"}
replaced_in_u6 = {"U6-Q11", "U6-Q13", "U6-Q14", "U6-Q16", "U6-Q17", "U6-Q25", "U6-Q26", "U6-Q27", "U6-Q28"}
replaced_in_u7 = {"U7-Q04", "U7-Q06", "U7-Q10", "U7-Q11", "U7-Q19"}
replaced_in_u8 = {"U8-Q12"}

# Let's extract json-like objects from each core bank file
def extract_objects_from_ts(ts_code, array_name):
    # Find the array declaration
    m = re.search(r"export const " + array_name + r":\s*TraceableQuestion\[\]\s*=\s*(\[[\s\S]*\]);", ts_code)
    if not m:
        # try without type
        m = re.search(r"export const " + array_name + r"\s*=\s*(\[[\s\S]*\]);", ts_code)
    if not m:
        raise ValueError(f"Could not find array {array_name}")
    arr_str = m.group(1)
    return arr_str

print("Extracting arrays from existing files...")
u1_arr_str = extract_objects_from_ts(eqb_text, "unit1QuestionBank")
u2_arr_str = extract_objects_from_ts(u2_text, "unit2Questions")
u3_arr_str = extract_objects_from_ts(u3_text, "unit3CoreBank")
u4_arr_str = extract_objects_from_ts(u4_text, "unit4CoreBank")
u5_arr_str = extract_objects_from_ts(u5_text, "unit5CoreBank")
u6_arr_str = extract_objects_from_ts(u6_text, "unit6CoreBank")
u7_arr_str = extract_objects_from_ts(u7_text, "unit7CoreBank")
u8_arr_str = extract_objects_from_ts(u8_text, "unit8CoreBank")

print("All arrays extracted successfully.")
