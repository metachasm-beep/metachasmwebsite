
const fs = require('fs');
const path = require('path');

const skillsDir = 'f:/Matriarch/superpowers-main/skills';
const skillDirs = fs.readdirSync(skillsDir).filter(f => fs.statSync(path.join(skillsDir, f)).isDirectory());

const auditResults = skillDirs.map(skill => {
    const skillPath = path.join(skillsDir, skill, 'SKILL.md');
    if (!fs.existsSync(skillPath)) return { name: skill, error: 'SKILL.md not found' };

    const content = fs.readFileSync(skillPath, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    const frontmatter = frontmatterMatch ? frontmatterMatch[1] : null;
    
    const lines = content.split('\n');
    const bodyContent = frontmatterMatch ? content.slice(frontmatterMatch[0].length) : content;
    const wordCount = bodyContent.trim().split(/\s+/).length;

    return {
        name: skill,
        frontmatter,
        wordCount,
        hasSkillMd: true
    };
});

console.log(JSON.stringify(auditResults, null, 2));
