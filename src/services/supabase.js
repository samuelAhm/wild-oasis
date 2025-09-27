import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ywgmhoapmhjzmmxgtbse.supabase.co";

//get api from env file
const apiKey = import.meta.env.VITE_SUPABASE_KEY;

const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Z21ob2FwbWhqem1teGd0YnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0OTczODMsImV4cCI6MjA1NDA3MzM4M30.t2z5frBvfNqNTYpHvWUr-gA8sSHk7fGV5pQfEyPwIn8`;

// const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl3Z21ob2FwbWhqem1teGd0YnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg0OTczODMsImV4cCI6MjA1NDA3MzM4M30.t2z5frBvfNqNTYpHvWUr-gA8sSHk7fGV5pQfEyPwIn8
