// import { NextResponse } from "next/server";
// import { Client } from "@notionhq/client";

// // Notion 클라이언트 생성
// const notion = new Client({
//   auth: process.env.NOTION_API_KEY,
// });

// const databaseId = process.env.NOTION_DATABASE_ID;

// export async function GET() {
//   try {
//     if (!databaseId) {
//       return NextResponse.json({ error: "Database ID is missing" }, { status: 500 });
//     }

//     const response = await notion.databases.query({
//       database_id: databaseId,
//     });

//     // ✅ plain_text 값 및 cover URL 추출
//     const projectTexts = response.results.map((item: any) => {
//       const nameText = item.properties?.Name?.title?.map((t: any) => t.plain_text).join(" ") || "이름 없음";
//       const descriptionText = item.properties?.Description?.rich_text?.map((t: any) => t.plain_text).join(" ") || "설명 없음";
//       const coverUrl = item.cover?.external?.url || item.cover?.file?.url || null; // cover URL 추가
//       // console.log(coverUrl);

//       return { name: nameText, description: descriptionText, cover: coverUrl }; // cover 속성 추가
//     });

//     return NextResponse.json(projectTexts); // ✅ JSON 응답 반환 (필수)

//   } catch (error) {
//     console.error("❌ Notion API 호출 실패:", error);
//     return NextResponse.json({ error: "Failed to fetch Notion data" }, { status: 500 });
//   }
// }



import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";
import {
  QueryDatabaseResponse,
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";

// Notion 클라이언트 생성
const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

const databaseId = process.env.NOTION_DATABASE_ID;

// Notion API 응답 타입 정의
interface Project {
  name: string;
  description: string;
  cover: string | null;
}

export async function GET() {
  try {
    if (!databaseId) {
      return NextResponse.json({ error: "Database ID is missing" }, { status: 500 });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // 타입 단언을 사용하여 응답 타입을 명시적으로 지정
    const queryResponse = response as QueryDatabaseResponse;

    // ✅ plain_text 값 및 cover URL 추출
    const projectTexts: Project[] = queryResponse.results.map((item) => {
      const page = item as PageObjectResponse; // 타입 단언

      const nameText =
        page.properties?.Name?.type === "title"
          ? page.properties.Name.title
              .map((t: RichTextItemResponse) => t.plain_text)
              .join(" ")
          : "이름 없음";

      const descriptionText =
        page.properties?.Description?.type === "rich_text"
          ? page.properties.Description.rich_text
              .map((t: RichTextItemResponse) => t.plain_text)
              .join(" ")
          : "설명 없음";

      const coverUrl =
        page.cover?.type === "external"
          ? page.cover.external.url
          : page.cover?.type === "file"
          ? page.cover.file.url
          : null;

      return { name: nameText, description: descriptionText, cover: coverUrl };
    });

    return NextResponse.json(projectTexts); // ✅ JSON 응답 반환 (필수)
  } catch (error) {
    console.error("❌ Notion API 호출 실패:", error);
    return NextResponse.json({ error: "Failed to fetch Notion data" }, { status: 500 });
  }
}

