"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Hero from "@/components/home/hero";
import dynamic from "next/dynamic"; // 동적 임포트를 위한 next/dynamic

// ProjectItem 컴포넌트를 동적으로 임포트
const ProjectItem = dynamic(() => import("@/components/projects/project-item"), {
  ssr: false, // 서버 사이드 렌더링 비활성화
});

// ProjectItem 컴포넌트에 전달될 project의 타입을 정의합니다.
interface Project {
  cover: string | null;
  properties: {
    Name: {
      title: {
        plain_text: string;
      }[];
    } | undefined;
    Description: {
      rich_text: {
        plain_text: string;
      }[];
    } | undefined;
  };
  url: string;
  name: string;
  description: string;
}

export default function Projects() {
  const [projectTexts, setProjectTexts] = useState<Project[]>([]); // 명시적인 타입 지정
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/notion");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Project[] = await response.json(); // 명시적인 타입 지정

        setProjectTexts(
          data.map((project) => ({
            ...project,
            name: project.properties?.Name?.title?.[0]?.plain_text || "제목 없음",
            description:
              project.properties?.Description?.rich_text?.[0]?.plain_text ||
              "설명 없음",
          }))
        );
      } catch (error) {
        console.error("❌ 데이터를 불러오는 데 실패했습니다:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <Layout>
      <main>
        <Hero />
        <h1 className="text-4xl font-bold sm:text-6xl text-center my-8">
          프로젝트 목록 <span className="pl-4 text-blue-500">({projectTexts.length}개)</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projectTexts.map((project, index) => (
            <ProjectItem key={index} project={project} />
          ))}
        </div>

        {loading ? (
          <p>데이터 불러오는 중...</p>
        ) : projectTexts.length === 0 ? (
          <p>데이터 없음</p>
        ) : null}
      </main>
    </Layout>
  );
}
