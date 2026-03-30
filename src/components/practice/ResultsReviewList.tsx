"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export type ReviewItem = {
  id: string;
  questionNumber: number;
  status: "Correct" | "Incorrect" | "Flagged" | "Unanswered";
  studentAnswerLetter: string | null;
  studentAnswerText: string | null;
  correctAnswerLetter: string;
  correctAnswerText: string;
  explanationText: string;
};

export function ResultsReviewList({
  items,
  defaultExpandedId
}: {
  items: ReviewItem[];
  defaultExpandedId?: string;
}) {
  const fallbackExpandedId = useMemo(() => {
    return (
      defaultExpandedId ??
      items.find((item) => item.status === "Incorrect")?.id ??
      items.find((item) => item.status === "Flagged")?.id ??
      items[0]?.id
    );
  }, [defaultExpandedId, items]);

  const [expandedId, setExpandedId] = useState<string | null>(fallbackExpandedId ?? null);

  return (
    <div className="review-list">
      {items.map((item) => {
        const isExpanded = item.id === expandedId;

        return (
          <article className="review-item" key={item.id}>
            <button
              type="button"
              className="review-item-header"
              onClick={() => setExpandedId((current) => (current === item.id ? null : item.id))}
            >
              <span className="review-item-label">Question {item.questionNumber}</span>
              <span className="review-item-meta">
                <strong
                  className={`review-status review-status-${item.status.toLowerCase()}`}
                >
                  {item.status}
                </strong>
                <ChevronDown
                  size={16}
                  className={`review-chevron ${isExpanded ? "review-chevron-open" : ""}`}
                />
              </span>
            </button>

            {isExpanded ? (
              <div className="review-item-body">
                <div className="review-answer-grid">
                  <div className="review-answer-block">
                    <p className="review-answer-label">Your answer</p>
                    <p className="review-answer-value">
                      {item.studentAnswerLetter ? `${item.studentAnswerLetter} — ${item.studentAnswerText}` : "Unanswered"}
                    </p>
                  </div>
                  <div className="review-answer-block">
                    <p className="review-answer-label">Correct answer</p>
                    <p className="review-answer-value review-answer-value-success">
                      {item.correctAnswerLetter} — {item.correctAnswerText}
                    </p>
                  </div>
                </div>
                <p className="review-explanation">{item.explanationText}</p>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
