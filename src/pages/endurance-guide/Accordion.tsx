import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
};

export function Accordion({
  items,
  defaultOpenId,
}: {
  items: AccordionItem[];
  defaultOpenId?: string;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId ?? null);

  return (
    <div className="accordion">
      {items.map((item) => {
        const isOpen = openId === item.id;
        return (
          <div
            className={isOpen ? "accordion-item is-open" : "accordion-item"}
            key={item.id}
          >
            <button
              type="button"
              className="accordion-trigger"
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              onClick={() => setOpenId(isOpen ? null : item.id)}
            >
              <span className="accordion-trigger-text">
                <strong>{item.title}</strong>
                {item.subtitle && (
                  <span className="accordion-subtitle">{item.subtitle}</span>
                )}
              </span>
              <ChevronDown size={18} className="accordion-chevron" />
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              className="accordion-panel"
              role="region"
            >
              <div className="accordion-panel-inner">{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
