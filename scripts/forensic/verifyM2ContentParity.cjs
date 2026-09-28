const fs=require('fs'), path=require('path'), crypto=require('crypto');
const ROOT=process.cwd();
const original=path.resolve(ROOT,'migration/snapshots/original_inputs');
const report=path.resolve(ROOT,'migration/content-governance/M2_CONTENT_PARITY_MANIFEST.json');
if(!fs.existsSync(report)){console.error('M2 manifest missing');process.exit(2)}
const m=JSON.parse(fs.readFileSync(report,'utf8'));
let failures=[];
for(const r of m.files){if(!r.exact) failures.push(r.path)}
if(m.report.business.question_duplicate_ids!==0) failures.push('business duplicate question IDs');
if((m.report.cross_domain_id_collisions||[]).length) failures.push('cross-domain ID collisions');
if(failures.length){console.error('M2 FAIL',failures);process.exit(1)}
console.log('M2 CONTENT PARITY PASS');
console.log(`Business src exact parity: ${m.report.exact_src_file_parity}/${m.report.src_files_checked}`);
console.log(`Business question IDs unique: ${m.report.business.question_unique_ids}`);
console.log(`Cross-domain ID collisions: 0`);
