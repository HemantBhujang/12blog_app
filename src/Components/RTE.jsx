import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    const [editorLoaded, setEditorLoaded] = useState(false);
    const [useFallback, setUseFallback] = useState(false);

    return (
        <div className='w-full text-left space-y-2'>
            <div className="flex items-center justify-between">
                {label && (
                    <label className='inline-block text-xs font-semibold uppercase tracking-wider text-slate-300'>
                        {label}
                    </label>
                )}
                {/* Fallback Editor Toggle in case TinyMCE CDN is blocked by Network/AdBlocker */}
                <button
                    type="button"
                    onClick={() => setUseFallback(!useFallback)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 transition-colors font-medium underline cursor-pointer"
                >
                    {useFallback ? "Switch to Visual Editor" : "Switch to Standard Editor"}
                </button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-lg bg-slate-900/80">
                <Controller
                    name={name || "content"}
                    control={control}
                    defaultValue={defaultValue}
                    render={({ field: { onChange, value } }) => (
                        useFallback ? (
                            <div className="p-3 space-y-2">
                                <div className="text-[11px] text-slate-400 font-medium bg-slate-950/60 p-2 rounded-lg border border-slate-800">
                                    💡 <strong>Standard Editor Mode:</strong> You can type plain text or HTML tags directly (e.g. <code>&lt;p&gt;Paragraph&lt;/p&gt;</code>, <code>&lt;h3&gt;Heading&lt;/h3&gt;</code>).
                                </div>
                                <textarea
                                    value={value || ""}
                                    onChange={(e) => onChange(e.target.value)}
                                    placeholder="Write your article content here..."
                                    rows={16}
                                    className="w-full p-4 bg-slate-950 text-slate-100 placeholder:text-slate-500 rounded-lg outline-none border border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-mono text-sm leading-relaxed resize-y"
                                />
                            </div>
                        ) : (
                            <Editor
                                // apiKey="TINYMCE_API_KEY"
                                  apiKey={import.meta.env.TINYMCE_API_KEY}
                                value={value !== undefined ? value : defaultValue}
                                onInit={() => setEditorLoaded(true)}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    skin: "oxide-dark",
                                    content_css: "dark",
                                    branding: false,
                                    promotion: false,
                                    plugins: [
                                        "image",
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "charmap",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "wordcount",
                                    ],
                                    toolbar:
                                        "undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | image link | help",
                                    content_style: "body { font-family: Inter, Helvetica, Arial, sans-serif; font-size: 15px; background-color: #0f172a; color: #f8fafc; line-height: 1.6; } p { margin-bottom: 1rem; }"
                                }}
                                onEditorChange={(newContent) => {
                                    onChange(newContent);
                                }}
                            />
                        )
                    )}
                />
            </div>
        </div>
    )
}
