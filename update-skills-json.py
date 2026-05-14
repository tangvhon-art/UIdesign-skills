#!/usr/bin/env python3
"""
自动更新skills.json文件
"""

import json
import os

def main():
    skills_json_path = os.path.expanduser("~/.agent-skills/skills.json")
    
    if not os.path.exists(skills_json_path):
        print(f"错误: {skills_json_path} 不存在")
        return
    
    try:
        # 读取现有的skills.json
        with open(skills_json_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 检查是否已存在uidesign技能
        skills = data.get('skills', [])
        for skill in skills:
            if skill.get('name') == 'uidesign':
                print("uidesign技能已存在，跳过添加")
                return
        
        # 添加新的skill条目
        uidesign_skill = {
            "name": "uidesign",
            "display_name": "UI Design & Frontend Standards",
            "description": "Unified design system and frontend development standards for all business systems.",
            "category": "development",
            "subcategory": None,
            "path": "skills/development/uidesign/SKILL.md",
            "install_path": "skills/development/uidesign/",
            "version": "1.0.0",
            "tags": [
                "ui-design",
                "frontend",
                "design-system",
                "component-library"
            ],
            "providers": [],
            "install_dependencies": [],
            "compatibility": {
                "agent": ">=0.1.0"
            }
        }
        
        skills.append(uidesign_skill)
        data['skills'] = skills
        
        # 写回文件
        with open(skills_json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        
        print(f"✓ 成功更新 {skills_json_path}")
        print(f"✓ 添加了 uidesign 技能")
        
    except Exception as e:
        print(f"错误: {e}")
        print("\n请手动更新技能:")
        print("1. 打开 ~/.agent-skills/skills.json")
        print("2. 在 'skills' 数组中添加以上JSON")
        print("3. 保存文件")

if __name__ == "__main__":
    main()