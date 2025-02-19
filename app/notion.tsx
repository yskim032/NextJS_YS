import { NextResponse } from "next/server";
import { Client } from "@notionhq/client";

// Notion 클라이언트 생성
const notion = new Client({
  auth: process.env.NOTION_API_KEY, // 보안이 중요한 API 키는 서버에서만 사용
});

const databaseId = process.env.NOTION_DATABASE_ID;

export async function GET() {
  try {
    if (!databaseId) {
      return NextResponse.json({ error: "Database ID is missing" }, { status: 500 });
    }

    const response = await notion.databases.query({
      database_id: databaseId,
    });

    // console.log("📌 Notion 데이터:", response.results); // 콘솔에서 확인

    return NextResponse.json(response.results);
  } catch { // error 변수 제거
    // console.error("❌ Notion API 호출 실패:"); // error 변수 제거 후 콘솔 에러를 남기려면 이렇게 수정
    return NextResponse.json({ error: "Failed to fetch Notion data" }, { status: 500 });
  }
}