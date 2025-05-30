import { prisma } from "@college-assistant/db";
import csvParser from "csv-parser";
import { Readable } from "stream";

export const parseAndStoreCSV = async (buffer: Buffer, userId: string) => {
  const results: {
    ExamType: string;
    Subject: string;
    Marks: string;
    MaxMarks: string;
  }[] = [];

  await new Promise((resolve, reject) => {
    Readable.from(buffer)
      .pipe(csvParser())
      .on("data", (row) => results.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  const transformed = results.map((row) => ({
    userId,
    examType: row.ExamType,
    subject: row.Subject,
    marks: parseInt(row.Marks),
    maxMarks: parseInt(row.MaxMarks),
  }));

  await prisma.score.createMany({ data: transformed });
};
