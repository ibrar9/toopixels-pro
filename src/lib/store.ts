"use server";

import fs from 'fs/promises';
import path from 'path';
import { mockProjects, mockBlogs, Project, BlogPost, Inquiry } from './db';
import { defaultSiteConfig, SiteConfig } from './siteConfig';

const DB_PATH = path.join(process.cwd(), 'data-storage.json');

async function ensureDB() {
  try {
    await fs.access(DB_PATH);
  } catch {
    const initialData = { 
       projects: mockProjects, 
       blogs: mockBlogs,
       config: defaultSiteConfig,
       inquiries: []
    };
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

export async function updateConfig(config: SiteConfig) {
  const data = await getData();
  data.config = config;
  await saveData(data);
  return config;
}

export async function getConfig() {
  const data = await getData();
  return data.config || defaultSiteConfig;
}

export async function addInquiry(inquiry: Inquiry) {
  const data = await getData();
  if (!data.inquiries) data.inquiries = [];
  data.inquiries.push(inquiry);
  await saveData(data);
  return inquiry;
}

export async function getInquiries() {
  const data = await getData();
  return data.inquiries || [];
}

export async function updateInquiry(id: string, updates: Partial<Inquiry>) {
  const data = await getData();
  const index = data.inquiries.findIndex((inq: Inquiry) => inq.id === id);
  if (index !== -1) {
    data.inquiries[index] = { ...data.inquiries[index], ...updates };
    await saveData(data);
    return data.inquiries[index];
  }
  return null;
}

export async function addOrder(order: any) {
  const data = await getData();
  if (!data.orders) data.orders = [];
  data.orders.push(order);
  await saveData(data);
  return order;
}

export async function getOrders() {
  const data = await getData();
  return data.orders || [];
}

export async function updateOrder(id: string, updates: any) {
  const data = await getData();
  const index = data.orders.findIndex((o: any) => o.id === id);
  if (index !== -1) {
    data.orders[index] = { ...data.orders[index], ...updates };
    await saveData(data);
    return data.orders[index];
  }
  return null;
}
export async function deleteInquiry(id: string) {
  const data = await getData();
  data.inquiries = (data.inquiries || []).filter((i: any) => i.id !== id);
  await saveData(data);
  return true;
}

export async function deleteOrder(id: string) {
  const data = await getData();
  data.orders = (data.orders || []).filter((o: any) => o.id !== id);
  await saveData(data);
  return true;
}
