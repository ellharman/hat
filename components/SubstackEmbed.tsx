import React, { useState, useEffect } from "react";

interface SubstackCardProps {
  url: string;
  className?: string;
}

interface SubstackData {
  title: string;
  description: string;
  author: string;
  publishedDate: string;
  thumbnail?: string;
  publicationName: string;
}

const SubstackCard: React.FC<SubstackCardProps> = ({ url, className = "" }) => {
  const [data, setData] = useState<SubstackData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubstackData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/substack-preview?url=${url}`);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to load Substack data");
        console.error("Error fetching Substack data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchSubstackData();
    }
  }, [url]);

  if (loading) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md p-6 border border-gray-200 ${className}`}
      >
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="flex items-center space-x-4">
            <div className="h-3 bg-gray-200 rounded w-20"></div>
            <div className="h-3 bg-gray-200 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-white rounded-lg shadow-md p-6 border border-red-200 ${className}`}
      >
        <div className="text-red-600 text-center">
          <p className="font-medium mb-2">Unable to load Substack post</p>
          <p className="text-sm text-gray-600">{error}</p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 mt-2 text-sm"
          >
            View on Substack →
          </a>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div
      className={`bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 ${className} md:max-w-xl mx-auto`}
    >
      {data.thumbnail && (
        <div className="aspect-video bg-gray-100">
          <img
            src={data.thumbnail}
            alt={data.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 leading-tight">
            {data.title}
          </h3>

          <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
            {data.description}
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
          </div>
        </div>

        <div className="flex items-center mx-auto justify-center">
          <div className="text-sm text-gray-500">{data.publicationName}</div>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors duration-200 text-sm font-medium"
          >
            Read on Substack →
          </a>
        </div>
      </div>
    </div>
  );
};

export default SubstackCard;
