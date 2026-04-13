"use client";

import { useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

export type ReviewChoice = {
  letter: string;
  text: string;
  rationale: string;
  tone: "correct" | "selected-wrong" | "neutral";
  labelSuffix?: string;
};

export type ReviewItem = {
  id: string;
  questionNumber: number;
  status: "Correct" | "Incorrect" | "Flagged" | "Unanswered";
  prompt: string;
  choices: ReviewChoice[];
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
                <div className="review-question-copy">
                  <p className="review-question-prompt">{item.prompt}</p>
                </div>
                <div className="review-choice-list">
                  <p className="review-choice-list-label">Answer choices and rationale</p>

                  {item.choices.map((choice) => (
                    <article className="review-choice-card" key={`${item.id}-${choice.letter}`}>
                      <p
                        className={`review-choice-title review-choice-title-${choice.tone}`}
                      >
                        {choice.letter} - {choice.text}
                        {choice.labelSuffix ? ` ${choice.labelSuffix}` : ""}
                      </p>
                      <p className="review-choice-rationale">{choice.rationale}</p>
                    </article>
                  ))}
                </div>
              </div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
