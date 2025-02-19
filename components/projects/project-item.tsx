import Image from "next/image";

interface ProjectItemProps {
  project: {
    cover: string | null;
    properties: {
      Name: {
        title: {
          plain_text: string;
        }[];
      };
      Description: {
        rich_text: {
          plain_text: string;
        }[];
      };
    };
    url: string;
  };
}

export default function ProjectItem({ project }: ProjectItemProps) {
  const imageUrl = project?.cover; // project가 undefined일 경우를 대비
  const title = project?.properties?.Name?.title?.[0]?.plain_text;

  return (
    <div className="p-6 m-10 bg-white rounded-lg shadow-md" style={{ backgroundColor: "#E6E6FA" }}>
      {imageUrl && (
        <div style={{ position: "relative", width: "100%", height: "400px", overflow: "hidden" }}>
          <Image
            className="rounded-t-xl"
            src={imageUrl}
            alt={title || "프로젝트 이미지"} // title이 없을 경우 대체 텍스트 제공
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            onError={(e) => {
              console.error("이미지 로딩 실패:", e);
              console.error("이미지 URL:", imageUrl); // 이미지 URL 추가 로깅
            }}
          />
        </div>
      )}

      <h1 className="text-xl font-bold mt-4">
        {project?.properties?.Name?.title?.[0]?.plain_text || "제목 없음"} {/* 제목이 없을 경우 대체 텍스트 제공 */}
      </h1>
      <p className="mt-2 text-gray-700">
        {project?.properties?.Description?.rich_text?.[0]?.plain_text || "설명 없음"} {/* 설명이 없을 경우 대체 텍스트 제공 */}
      </p>

      <p className="mt-2">
        <a
          href={project?.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Notion 링크
        </a>
      </p>
    </div>
  );
}