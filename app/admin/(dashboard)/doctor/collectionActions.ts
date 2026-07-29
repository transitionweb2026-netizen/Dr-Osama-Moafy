"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

// ---------------------------------------------------------------------------
// Testimonials
// ---------------------------------------------------------------------------
export interface TestimonialPayload {
  name_en: string;
  name_ar: string;
  quote_en: string;
  quote_ar: string;
  initials: string;
  rating: number;
  is_visible: boolean;
}

export async function createTestimonial(payload: TestimonialPayload) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("testimonials")
    .select("id", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("testimonials")
    .insert({ ...payload, sort_order: count ?? 0 })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/doctor");
  return data;
}

export async function updateTestimonial(id: string, payload: TestimonialPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("testimonials")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/doctor");
  return data;
}

export async function deleteTestimonial(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonials").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/doctor");
}

export async function reorderTestimonials(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("testimonials").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/doctor");
}

// ---------------------------------------------------------------------------
// Timeline events
// ---------------------------------------------------------------------------
export interface TimelineEventPayload {
  period: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  is_visible: boolean;
}

export async function createTimelineEvent(payload: TimelineEventPayload) {
  const supabase = await createClient();
  const { count } = await supabase
    .from("timeline_events")
    .select("id", { count: "exact", head: true });
  const { data, error } = await supabase
    .from("timeline_events")
    .insert({ ...payload, sort_order: count ?? 0 })
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/doctor");
  return data;
}

export async function updateTimelineEvent(id: string, payload: TimelineEventPayload) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("timeline_events")
    .update(payload)
    .eq("id", id)
    .select()
    .single();
  if (error) throw new Error(error.message);
  revalidatePath("/admin/doctor");
  return data;
}

export async function deleteTimelineEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("timeline_events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/doctor");
}

export async function reorderTimelineEvents(orderedIds: string[]) {
  const supabase = await createClient();
  await Promise.all(
    orderedIds.map((id, index) =>
      supabase.from("timeline_events").update({ sort_order: index }).eq("id", id)
    )
  );
  revalidatePath("/admin/doctor");
}
