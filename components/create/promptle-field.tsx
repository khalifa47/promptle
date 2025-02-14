"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { CircleX } from "lucide-react";

export default function PromptleField({
  index,
  prompts,
  decoys,
  promptFieldsCount,
  setPromptFieldCount,
  setPrompts,
  setDecoys,
}: {
  index: number;
  prompts: string[];
  decoys: string[];
  promptFieldsCount: number;
  setPromptFieldCount: (promptFieldsCount: number) => void;
  setPrompts: (prompts: string[]) => void;
  setDecoys: (decoys: string[]) => void;
}) {
  const [isPromptValid, setIsPromptValid] = useState<boolean>(true);
  const [prompt, setPrompt] = useState<string>("");
  const [decoy, setDecoy] = useState<string>("");
  const [isDecoyValid, setIsDecoyValid] = useState<boolean>(true);

  useEffect(() => {
    checkPromptValidity(prompt);
    checkDecoyValidity(decoy);
  }, [prompt]);

  const checkPromptValidity = (prompt: string) => {
    if (prompt.trim().split(" ").length > 6) {
      setIsPromptValid(false);
    } else {
      setIsPromptValid(true);
    }
  };

  const checkDecoyValidity = (decoy: string) => {
    if (decoy.trim().split(" ").length > 12) {
      setIsDecoyValid(false);
    } else {
      setIsDecoyValid(true);
    }
  };

  const removePromptFieldCount = () => {
    setPromptFieldCount(promptFieldsCount - 1);
    prompts.splice(index, 1);
    setPrompts([...prompts]);
  };
  return (
    <>
      <div key={index} className="w-full">
        <div className="flex  p-0.5 ">
          <div className="grid grid-cols-12 gap-2 w-full">
            <Input
              type="text"
              placeholder={`prompt ${index + 1}`}
              onChange={(event) => {
                setPrompt(event.target.value);
                prompts[index] = event.target.value;
                setPrompts([...prompts]);
              }}
              className="col-span-5 mb-1 w-full"
            />
            <Input
              type="text"
              placeholder={`decoy words: upto 12 words`}
              onChange={(event) => {
                setDecoy(event.target.value);
                decoys[index] = event.target.value;
                setDecoys([...decoys]);
              }}
              className="col-span-7 mb-1 w-full"
            />
          </div>
          {index > 0 && (
            <Button
              variant="ghost"
              className="mx-1 rounded-2xl"
              onClick={removePromptFieldCount}
            >
              <CircleX className="w-4 h-4" />
            </Button>
          )}
        </div>
        {!isPromptValid && (
          <div className="text-red-500 text-sm">Write at most 6 words</div>
        )}
        {!isDecoyValid && (
          <div className="text-red-500 text-sm">Write at most 12 words</div>
        )}
      </div>
    </>
  );
}
