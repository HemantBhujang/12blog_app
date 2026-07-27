import React from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
    return (
        <div className='w-full text-left'>
            {label && (
                <label className='inline-block mb-1.5 pl-1 text-xs font-semibold uppercase tracking-wider text-slate-300'>
                    {label}
                </label>
            )}

            <div className="rounded-xl overflow-hidden border border-slate-700/60 shadow-lg">
                <Controller
                    name={name || "content"}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Editor
                            initialValue={defaultValue}
                            value={value}
                            init={{
                                height: 500,
                                menubar: true,
                                skin: "oxide-dark",
                                content_css: "dark",
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
                            onEditorChange={onChange}
                        />
                    )}
                />
            </div>
        </div>
    )
}
