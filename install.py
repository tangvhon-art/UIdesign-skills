#!/usr/bin/env python3
"""
UI Design Skill 安装脚本
"""

import os
import shutil
import json
import sys

def main():
    print("=" * 60)
    print("   UI Design Skill 安装程序")
    print("=" * 60)
    
    # 获取当前目录和目标目录
    current_dir = os.path.dirname(os.path.abspath(__file__))
    skills_dir = os.path.expanduser("~/.agent-skills/skills")
    target_dir = os.path.join(skills_dir, "development", "uidesign")
    
    print(f"当前目录: {current_dir}")
    print(f"目标目录: {target_dir}")
    
    # 创建目标目录
    os.makedirs(target_dir, exist_ok=True)
    
    # 复制文件
    files_to_copy = [
        ("SKILL.md", "SKILL.md"),
        ("README.md", "README.md"),
        ("skill-manifest.json", "skill-manifest.json")
    ]
    
    print("\n复制文件中...")
    for src, dst in files_to_copy:
        src_path = os.path.join(current_dir, src)
        dst_path = os.path.join(target_dir, dst)
        if os.path.exists(src_path):
            shutil.copy2(src_path, dst_path)
            print(f"  ✓ {src} -> {dst_path}")
        else:
            print(f"  ✗ {src} 不存在")
    
    # 复制design目录
    design_src = os.path.join(current_dir, "design")
    design_dst = os.path.join(target_dir, "design")
    if os.path.exists(design_src):
        if os.path.exists(design_dst):
            shutil.rmtree(design_dst)
        shutil.copytree(design_src, design_dst)
        print(f"  ✓ design/ -> {design_dst}")
    
    # 显示手动更新步骤
    print("\n" + "=" * 60)
    print("手动更新步骤:")
    print("=" * 60)
    print()
    print("1. 打开文件: ~/.agent-skills/skills.json")
    print("2. 找到 'skills' 数组")
    print("3. 添加以下条目:")
    print()
    
    skill_entry = {
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
        ]
    }
    
    print(json.dumps(skill_entry, indent=2, ensure_ascii=False))
    print()
    print("=" * 60)
    print("安装完成！")
    print()
    print("使用方法:")
    print("1. 当AI助手需要创建UI界面时，会自动识别并使用此技能")
    print("2. 技能路径: ~/.agent-skills/skills/development/uidesign/")
    print("3. 尝试让AI助手: '创建一个管理后台页面' 来测试技能")
    print("=" * 60)

if __name__ == "__main__":
    main()