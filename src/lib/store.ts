"use server";

import fs from 'fs/promises';
import path from 'path';
import { mockProjects, mockBlogs, Project, BlogPost } from './db';

const DB_PATH = path.join(process.cwd(), 'data-storage.json');

async function ensureDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initialData = { projects: mockProjects, blogs: mockBlogs };
    await fs.writeFile(DB_PATH, JSON.stringify(initialData, null, 2));
  }
}

export async function getData() {
  await ensureDB();
  const data = await fs.readFile(DB_PATH, 'utf-8');
  return JSON.parse(data);
}

export async function saveData(data: any) {
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
}

export async function addProject(project: Project) {
  const data = await getData();
  data.projects.push(project);
  await saveData(data);
  return project;
}

export async function addBlog(blog: BlogPost) {
  const data = await getData();
  data.blogs.push(blog);
  await saveData(data);
  return blog;
}
