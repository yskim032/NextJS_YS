// import Image from "next/image";

// interface ProjectItemProps {
//   project: any;
// }

// export default function ProjectItem({ project }: ProjectItemProps) {
//   // ✅ Cover 이미지가 존재하면만 Image 컴포넌트를 렌더링
//   const imageUrl = project.cover; // project.cover는 /api/notion에서 가공된 coverUrl을 가지고 있음
//   const title = project.properties?.Name?.title?.[0]?.plain_text;

//   return (
//     <div className="p-6 m-10 bg-white rounded-lg shadow-md" style={{ backgroundColor: '#E6E6FA' }}>
//       {/* ✅ Cover 이미지 표시 (이미지 URL이 있을 때만) */}
//       {imageUrl && (
//         <div style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden' }}> {/* 추가된 div */}
//           <Image
//             className="rounded-t-xl"
//             src={imageUrl}
//             alt={title}
//             fill // width, height 대신 fill 사용
//             sizes="100vw" // 이미지의 크기를 뷰포트 너비에 맞춤
//             style={{ objectFit: 'cover' }} // objectFit으로 이미지 비율 조정
//             onError={(e) => console.error("이미지 로딩 실패:", e)}
//           />
//         </div>
//       )}

//       {/* ✅ 프로젝트 정보 */}
//       <h1 className="text-xl font-bold mt-4">
//         {project.properties?.Name?.title?.[0]?.plain_text} {/* 프로젝트 이름을 가져오기 */}
//       </h1>
//       <p className="mt-2 text-gray-700">
//         {project.properties?.Description?.rich_text?.[0]?.plain_text} {/* 프로젝트 설명 */}
//       </p>

//       {/* ✅ 프로젝트 URL */}
//       <p className="mt-2">
//         <a href={project.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//            Notion 링크
//         </a>
//       </p>
//     </div>
//   );
// }



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
  const imageUrl = project.cover;
  const title = project.properties?.Name?.title?.[0]?.plain_text;

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
            onError={(e) => console.error("이미지 로딩 실패:", e)}
          />
        </div>
      )}

      <h1 className="text-xl font-bold mt-4">
        {project.properties?.Name?.title?.[0]?.plain_text || "제목 없음"} {/* 제목이 없을 경우 대체 텍스트 제공 */}
      </h1>
      <p className="mt-2 text-gray-700">
        {project.properties?.Description?.rich_text?.[0]?.plain_text || "설명 없음"} {/* 설명이 없을 경우 대체 텍스트 제공 */}
      </p>

      <p className="mt-2">
        <a
          href={project.url}
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