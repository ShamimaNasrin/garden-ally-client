"use client";

import { useEffect } from "react";
import { TPostCard } from "./PostCard";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";

type EditPostModalProps = {
  post: TPostCard;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormData = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  isPremium: boolean;
};

const EditPostModal = ({ post, closeModal }: EditPostModalProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: post.title,
      description: post.description,
      imageUrl: post.imageUrl,
      category: post.category,
      isPremium: post.isPremium,
    },
  });

  useEffect(() => {
    setValue("title", post.title);
    setValue("description", post.description);
    setValue("imageUrl", post.imageUrl);
    setValue("isPremium", post.isPremium);
  }, [post, setValue]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    toast.success("Post updated successfully!");
    closeModal(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Post</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-gray-700 font-semibold mb-1">
            Title
          </label>
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Title"
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title.message}</p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Description
          </label>
          <textarea
            className="w-full p-2 mb-4 border rounded"
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Image URL
          </label>
          <input
            className="w-full p-2 mb-4 border rounded"
            placeholder="Image URL"
            {...register("imageUrl", { required: "Image URL is required" })}
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>
          )}

          <label className="block text-gray-700 font-semibold mb-1">
            Category
          </label>
          <select
            className="w-full p-2 mb-4 border rounded"
            {...register("category")}
          >
            <option>Vegetables</option>
            <option>Flowers</option>
            <option>Landscaping</option>
            <option>Indoor Plants</option>
          </select>

          <label className="flex items-center space-x-2 mb-4">
            <input type="checkbox" {...register("isPremium")} />
            <span>Premium</span>
          </label>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => closeModal(false)}
              className="px-4 py-2 text-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPostModal;
