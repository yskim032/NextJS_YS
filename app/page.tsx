"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Hero from "@/components/home/hero";
import ProjectItem from "@/components/projects/project-item";

export default function Projects() {
    const [projectTexts, setProjectTexts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/notion");
                const data = await response.json();

                // ✅ 모든 properties 저장
                setProjectTexts(data);
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
                <h1 className="text-4xl font-bold sm:text-6xl text-center my-8">프로젝트 목록 <span className="pl-4 text-blue-500">({projectTexts.length}개)</span></h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {projectTexts.map((project, index) => (
                        <ProjectItem key={index} project={project} />
                    ))}

                </div>
                

                {loading ? (
                    <p>데이터 불러오는 중...</p>
                ) : projectTexts.length > 0 ? (
                    <ul>
                        {projectTexts.map((project, index) => (
                            <li key={index}>
                                <strong>{project.name}</strong> - {project.description}
         
                                <ProjectItem project={project} />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>데이터 없음</p>
                )}



            </main>
        </Layout>
    );
}

