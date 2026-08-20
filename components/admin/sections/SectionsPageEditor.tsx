"use client";

import { useState, useTransition } from "react";
import { ReorderList, DragHandle, type DragHandleProps } from "@/components/admin/form/ReorderList";
import { ImagePickerInline } from "@/components/admin/form/ImagePickerInline";
import { IconPickerInline } from "@/components/admin/form/IconPickerInline";
import { VideoFilePickerInline } from "@/components/admin/form/VideoFilePickerInline";
import {
  saveSection,
  deleteSection,
  reorderSections,
  type SectionFieldInput,
  type SectionFieldType,
} from "@/lib/cms/sectionsActions";
import { deriveSectionFields } from "@/lib/cms/deriveSectionFields";
import type { ContentStatus } from "@/types/database";

export interface SectionRowData {
  id: string;
  page_slug: string;
  section_key: string;
  content_en: Record<string, unknown>;
  content_ar: Record<string, unknown>;
  is_visible: boolean;
  status: ContentStatus;
  sort_order: number;
}

export function SectionsPageEditor({
  pageSlug,
  initialSections,
}: {
  pageSlug: string;
  initialSections: SectionRowData[];
}) {
  const [sections, setSections] = useState(initialSections);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [newKey, setNewKey] = useState("");
  const [creating, setCreating] = useState(false);
  const [isPending, startTransition] = useTransition();

  function handleReorder(next: SectionRowData[]) {
    setSections(next);
    startTransition(() => {
      reorderSections(pageSlug, next.map((section) => section.id));
    });
  }

  async function handleCreate() {
    const key = newKey.trim();
    if (!key) return;
    setCreating(true);
    const result = await saveSection({
      pageSlug,
      sectionKey: key,
      isVisible: true,
      status: "published",
      fields: [],
    });
    setCreating(false);
    if (result.success && result.id) {
      const created: SectionRowData = {
        id: result.id,
        page_slug: pageSlug,
        section_key: key,
        content_en: {},
        content_ar: {},
        is_visible: true,
        status: "published",
        sort_order: sections.length,
      };
      setSections((prev) => [...prev, created]);
      setNewKey("");
      setExpandedId(result.id);
    }
  }

  async function handleDelete(id: string, key: string) {
    if (!window.confirm(`Delete section "${key}"? This can't be undone.`)) return;
    setSections((prev) => prev.filter((section) => section.id !== id));
    await deleteSection(id, pageSlug);
  }

  return (
    <div>
      {isPending && <p className="mb-2 text-xs text-admin-muted">Saving order…</p>}

      {sections.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-admin-border p-10 text-center text-sm text-admin-muted">
          No sections yet for this page.
        </div>
      ) : (
        <ReorderList
          items={sections}
          onReorder={handleReorder}
          renderItem={(section, dragHandleProps) => (
            <SectionCard
              pageSlug={pageSlug}
              section={section}
              dragHandleProps={dragHandleProps}
              expanded={expandedId === section.id}
              onToggleExpand={() =>
                setExpandedId((current) => (current === section.id ? null : section.id))
              }
              onDelete={() => handleDelete(section.id, section.section_key)}
              onSaved={(patch) =>
                setSections((prev) =>
                  prev.map((item) => (item.id === section.id ? { ...item, ...patch } : item))
                )
              }
            />
          )}
        />
      )}

      <div className="mt-4 flex items-center gap-2 rounded-xl border border-dashed border-admin-border p-4">
        <input
          value={newKey}
          onChange={(event) => setNewKey(event.target.value)}
          placeholder="new_section_key (e.g. hero, intro, cta)"
          className="flex-1 rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={creating || !newKey.trim()}
          className="flex items-center gap-2 rounded-lg bg-admin-accent px-3.5 py-2 text-sm font-semibold text-admin-accent-contrast hover:opacity-90 disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          {creating ? "Adding…" : "Add section"}
        </button>
      </div>
    </div>
  );
}

const FIELD_TYPE_OPTIONS: { value: SectionFieldType; label: string }[] = [
  { value: "string", label: "Text" },
  { value: "array", label: "List (one per line)" },
  { value: "json", label: "Structured (JSON)" },
  { value: "image", label: "Image" },
  { value: "icon", label: "Icon" },
  { value: "video", label: "Video" },
];

function SectionCard({
  pageSlug,
  section,
  dragHandleProps,
  expanded,
  onToggleExpand,
  onDelete,
  onSaved,
}: {
  pageSlug: string;
  section: SectionRowData;
  dragHandleProps: DragHandleProps;
  expanded: boolean;
  onToggleExpand: () => void;
  onDelete: () => void;
  onSaved: (patch: Partial<SectionRowData>) => void;
}) {
  const [fields, setFields] = useState<SectionFieldInput[]>(() =>
    deriveSectionFields(section.content_en, section.content_ar)
  );
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isVisible, setIsVisible] = useState(section.is_visible);
  const [status, setStatus] = useState<ContentStatus>(section.status);
  const [newFieldKey, setNewFieldKey] = useState("");
  const [newFieldType, setNewFieldType] = useState<SectionFieldType>("string");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);

  function updateField(index: number, patch: Partial<SectionFieldInput>) {
    setFields((prev) => prev.map((field, i) => (i === index ? { ...field, ...patch } : field)));
  }

  function removeField(index: number) {
    setFields((prev) => prev.filter((_, i) => i !== index));
  }

  function addField() {
    const key = newFieldKey.trim();
    if (!key) return;
    if (fields.some((field) => field.key === key)) {
      setError(`A field named "${key}" already exists.`);
      return;
    }
    setFields((prev) => [...prev, { key, type: newFieldType, en: "", ar: "" }]);
    setNewFieldKey("");
    setError(null);
  }

  async function handleSave() {
    setSaving(true);
    setError(null);
    const result = await saveSection({
      id: section.id,
      pageSlug,
      sectionKey: section.section_key,
      isVisible,
      status,
      fields,
    });
    setSaving(false);
    if (!result.success) {
      setError(result.error ?? "Save failed.");
      return;
    }
    onSaved({ is_visible: isVisible, status });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1500);
  }

  return (
    <div className="rounded-xl border border-admin-border bg-admin-surface">
      <div className="flex items-center gap-3 px-3 py-3">
        <DragHandle {...dragHandleProps} />
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex flex-1 items-center gap-2 text-start"
        >
          <span className="material-symbols-outlined text-[18px] text-admin-muted">
            {expanded ? "expand_less" : "expand_more"}
          </span>
          <span className="text-sm font-medium text-admin-text">{section.section_key}</span>
          <span className="text-xs text-admin-muted">({fields.length} fields)</span>
        </button>

        {!isVisible && (
          <span className="rounded-full bg-admin-warning/10 px-2.5 py-1 text-xs font-medium text-admin-warning">
            Hidden
          </span>
        )}
        <span
          className={`rounded-full px-2.5 py-1 text-xs font-medium ${
            status === "published"
              ? "bg-admin-success/10 text-admin-success"
              : "bg-admin-warning/10 text-admin-warning"
          }`}
        >
          {status}
        </span>
        <button
          type="button"
          onClick={onDelete}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-danger-container hover:text-admin-danger"
          aria-label="Delete section"
        >
          <span className="material-symbols-outlined text-[18px]">delete</span>
        </button>
      </div>

      {expanded && (
        <div className="border-t border-admin-border p-4">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div
              role="tablist"
              className="inline-flex rounded-lg border border-admin-border bg-admin-surface-alt p-1"
            >
              {(["en", "ar"] as const).map((loc) => (
                <button
                  key={loc}
                  type="button"
                  role="tab"
                  aria-selected={locale === loc}
                  onClick={() => setLocale(loc)}
                  className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    locale === loc
                      ? "bg-admin-accent text-admin-accent-contrast"
                      : "text-admin-muted hover:text-admin-text"
                  }`}
                >
                  {loc === "en" ? "English" : "Arabic"}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm text-admin-text">
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={(event) => setIsVisible(event.target.checked)}
                />
                Visible
              </label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as ContentStatus)}
                className="rounded-lg border border-admin-border bg-admin-bg px-2.5 py-1.5 text-sm text-admin-text outline-none focus:border-admin-accent"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {fields.map((field, index) => (
              <div key={field.key} className="rounded-lg border border-admin-border p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-admin-text">{field.key}</span>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-admin-surface-alt px-2 py-0.5 text-xs text-admin-muted">
                      {FIELD_TYPE_OPTIONS.find((opt) => opt.value === field.type)?.label}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeField(index)}
                      className="flex h-7 w-7 items-center justify-center rounded-lg text-admin-muted hover:bg-admin-danger-container hover:text-admin-danger"
                      aria-label={`Remove ${field.key}`}
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                </div>
                {field.type === "image" ? (
                  <ImagePickerInline
                    label="Current image"
                    value={field.en ? { id: "", url: field.en, filename: field.key } : null}
                    onChange={(media) => {
                      const url = media?.url ?? "";
                      updateField(index, { en: url, ar: url });
                    }}
                  />
                ) : field.type === "icon" ? (
                  <IconPickerInline
                    label=""
                    value={field.en}
                    onChange={(value) => updateField(index, { en: value, ar: value })}
                  />
                ) : field.type === "video" ? (
                  <VideoFilePickerInline
                    label=""
                    value={field.en}
                    onChange={(value) => updateField(index, { en: value, ar: value })}
                  />
                ) : (
                  <>
                    <textarea
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      value={locale === "en" ? field.en : field.ar}
                      onChange={(event) =>
                        updateField(index, {
                          [locale]: event.target.value,
                        } as Partial<SectionFieldInput>)
                      }
                      rows={field.type === "json" ? 6 : field.type === "array" ? 4 : 2}
                      className={`w-full rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent ${
                        field.type === "json" ? "font-mono" : ""
                      }`}
                    />
                    {field.type === "array" && (
                      <p className="mt-1 text-xs text-admin-muted">One item per line.</p>
                    )}
                    {field.type === "json" && (
                      <p className="mt-1 text-xs text-admin-muted">Raw JSON.</p>
                    )}
                  </>
                )}
              </div>
            ))}

            {fields.length === 0 && (
              <p className="text-sm text-admin-muted">No fields yet — add one below.</p>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 rounded-lg border border-dashed border-admin-border p-3">
            <input
              value={newFieldKey}
              onChange={(event) => setNewFieldKey(event.target.value)}
              placeholder="field_key"
              className="min-w-[10rem] flex-1 rounded-lg border border-admin-border bg-admin-bg px-3 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
            />
            <select
              value={newFieldType}
              onChange={(event) => setNewFieldType(event.target.value as SectionFieldType)}
              className="rounded-lg border border-admin-border bg-admin-bg px-2.5 py-2 text-sm text-admin-text outline-none focus:border-admin-accent"
            >
              {FIELD_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={addField}
              className="rounded-lg border border-admin-border px-3 py-2 text-sm font-medium text-admin-text hover:bg-admin-surface-alt"
            >
              Add field
            </button>
          </div>

          {error && (
            <p className="mt-4 rounded-lg bg-admin-danger-container px-3 py-2 text-sm text-admin-danger">
              {error}
            </p>
          )}

          <div className="mt-4 flex items-center justify-end gap-3">
            {savedFlash && <span className="text-sm text-admin-success">Saved.</span>}
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-admin-accent px-4 py-2.5 text-sm font-semibold text-admin-accent-contrast hover:opacity-90 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save section"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
