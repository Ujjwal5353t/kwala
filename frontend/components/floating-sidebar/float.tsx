"use client";

import { useState, useRef, useEffect } from "react";
import CustomBlock from "../nodes/custom";
import groupedBlocks from "./data";
import { Code, GripHorizontal, ChevronUp, ChevronDown } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod";
import { toast } from 'sonner'
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

export default function FloatingSidebar({ addBlock }) {
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);
  const [position, setPosition] = useState({ x: 40, y: 120 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isOpen, setIsOpen] = useState(true);
  const sidebarRef = useRef(null);

  const formSchema = z.object({
    blockName: z.string().min(1, "Block name is required"),
    solidityCode: z.string().min(1, "Solidity code is required"),
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      blockName: "",
      solidityCode: "",
    },
  })

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = (sidebarRef.current as unknown as HTMLDivElement)?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);
  return (
    <div
      ref={sidebarRef}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        zIndex: 50,
      }}
      className="w-max rounded-lg drop-shadow-2xl"
    >
      <div className="bg-[#252525] p-4 text-white rounded-xl border border-gray-700">
        {/* Drag Handle with Toggle */}
        <div
          className="flex items-center justify-between gap-2 mb-3 cursor-grab active:cursor-grabbing bg-[#3a3a3a] px-3 py-1.5 rounded-md select-none"
        >
          <div
            onMouseDown={handleMouseDown}
            className="flex items-center gap-2 flex-1"
          >
            <GripHorizontal size={16} className="text-gray-400" />
            <span className="text-xs font-semibold text-gray-300">Blocks</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="ml-auto p-0 hover:bg-[#4a4a4a] rounded transition-colors"
            title={isOpen ? "Close sidebar" : "Open sidebar"}
          >
            {isOpen ? (
              <ChevronUp size={16} className="text-gray-400" />
            ) : (
              <ChevronDown size={16} className="text-gray-400" />
            )}
          </button>
        </div>

        {/* Scrollable Content - grows normally, adds scrollbar when constrained */}
        {isOpen && (
          <div className="overflow-y-auto overflow-x-hidden custom-scrollbar pr-2" style={{ maxHeight: 'calc(100vh - 200px)' }}>
            <TooltipProvider delayDuration={0}>
              {Object.entries(groupedBlocks).map(([category, blocks]) => (
                <div key={category} className="mb-2">
                  <h4 className="text-sm text-gray-300 my-4">{category}</h4>
                  <div className="flex gap-4 flex-wrap">
                    {blocks.map((block, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => addBlock(block)}
                            className={`relative w-8 h-8 rounded flex items-center justify-center transition-colors text-gray-400 ${block.color} ${block.borderColor} ${block.hoverBorderColor} group hoverEffect`}
                          >
                            {<block.icon size="20" />}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {block.content}
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </div>
              ))}
            </TooltipProvider>

            <CustomBlock isOpen={isCustomModalOpen}
              onOpenChange={setIsCustomModalOpen}
              onSubmitCustomBlock={onSubmitCustomBlock}
            />
          </div>
        )}
      </div>
    </div>
  );

  function onSubmitCustomBlock(values: { blockName: string }) {
    const newCustomBlock = {
      id: 'custom',
      content: values.blockName,
      color: 'bg-[#3C3C3C]',
      borderColor: 'border-[#6C6C6C]',
      hoverBorderColor: 'hover:border-[#9C9C9C]',
      icon: Code,
      code: '',
    }

    addBlock(newCustomBlock)
    setIsCustomModalOpen(false)
    form.reset()
    toast.success('Custom block added successfully')
  }
};