import React, { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, RTE, Select } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.$id || "",
            content: post?.content || "",
            status: post?.status || "active",
        },
    });

    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(() => {
        return post ? appwriteService.getFilePreview(post.featuredImage) : null;
    });

    const submit = async (data) => {
        setSubmitting(true);
        try {
            if (post) {
                const file = data.image && data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;

                if (file && post.featuredImage) {
                    appwriteService.deleteFile(post.featuredImage);
                }

                const dbPost = await appwriteService.updatePost(post.$id, {
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            } else {
                let fileId = "demo-cover";
                if (data.image && data.image[0]) {
                    const file = await appwriteService.uploadFile(data.image[0]);
                    if (file) fileId = file.$id;
                }

                data.featuredImage = fileId;
                const dbPost = await appwriteService.createPost({
                    ...data,
                    userId: userData?.$id || "user-1"
                });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                } else {
                    // Fallback navigate to home if offline/demo
                    navigate("/");
                }
            }
        } catch (err) {
            console.log("Submit post error:", err);
        } finally {
            setSubmitting(false);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === "string")
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s]+/g, "-")
                .replace(/\s+/g, "-");

        return "";
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === "title") {
                setValue("slug", slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => subscription.unsubscribe();
    }, [watch, slugTransform, setValue]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setImagePreview(url);
        }
    };

    return (
        <form onSubmit={handleSubmit(submit)} className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-100">
            {/* Main Form Area */}
            <div className="lg:col-span-8 space-y-6">
                <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 space-y-5">
                    <h2 className="text-xl font-bold text-slate-100 mb-2 pb-3 border-b border-slate-800">
                        {post ? "Edit Post Article" : "Create New Article"}
                    </h2>

                    <Input
                        label="Article Title"
                        placeholder="Enter a compelling title..."
                        className="text-lg font-medium"
                        {...register("title", { required: true })}
                    />

                    <Input
                        label="URL Slug"
                        placeholder="article-url-slug"
                        {...register("slug", { required: true })}
                        onInput={(e) => {
                            setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                        }}
                    />

                    <RTE label="Article Content" name="content" control={control} defaultValue={getValues("content")} />
                </div>
            </div>

            {/* Sidebar Controls */}
            <div className="lg:col-span-4 space-y-6">
                <div className="bg-slate-900/60 backdrop-blur-xl p-6 rounded-2xl border border-slate-800/80 space-y-6 sticky top-28">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 pb-3 border-b border-slate-800">
                        Publish Settings
                    </h3>

                    {/* Image Preview & Upload */}
                    <div>
                        <label className="inline-block mb-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Cover Image
                        </label>
                        <div className="border-2 border-dashed border-slate-700/80 rounded-xl p-4 text-center bg-slate-950/50 hover:border-indigo-500/50 transition-colors">
                            {imagePreview ? (
                                <div className="space-y-3">
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="w-full h-40 object-cover rounded-lg border border-slate-700"
                                    />
                                    <p className="text-xs text-indigo-400">Click below to change image</p>
                                </div>
                            ) : (
                                <div className="py-6 space-y-2">
                                    <svg className="w-10 h-10 mx-auto text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <p className="text-xs text-slate-400">PNG, JPG, GIF up to 5MB</p>
                                </div>
                            )}
                            <input
                                type="file"
                                className="mt-2 text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-600/20 file:text-indigo-400 hover:file:bg-indigo-600/30 cursor-pointer w-full"
                                accept="image/png, image/jpg, image/jpeg, image/gif"
                                {...register("image", { required: !post })}
                                onChange={(e) => {
                                    register("image").onChange(e);
                                    handleFileChange(e);
                                }}
                            />
                        </div>
                    </div>

                    <Select
                        options={["active", "inactive"]}
                        label="Visibility Status"
                        {...register("status", { required: true })}
                    />

                    <Button
                        type="submit"
                        disabled={submitting}
                        className={`w-full py-3 text-base font-bold shadow-lg ${
                            post
                                ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-600/20"
                                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-indigo-600/20"
                        }`}
                    >
                        {submitting ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                {post ? "Updating Post..." : "Publishing Post..."}
                            </span>
                        ) : post ? "Update Post Article" : "Publish Article"}
                    </Button>
                </div>
            </div>
        </form>
    );
}