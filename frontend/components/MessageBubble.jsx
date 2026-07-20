import { Check, Copy, ExternalLink, X } from 'lucide-react';
import React, { useState } from 'react'
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';



const MessageBubble = ({ role, content, images }) => {
    const isUser = role === "user";
    const [lightBox, setLightBox] = useState(null);
    const [copyCode, setCopyCode] = useState("");

    const copiedCode = async (code) => {
        try {
            await navigator.clipboard.writeText(code);

            setCopyCode(code);

            setTimeout(() => {
                setCopyCode("");
            }, 2000);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };
    return (
        <div className={`flex ${isUser ? " justify-end" : " justify-start"} `}>
            <div className={`w-fit max-w-[92vw] md:max-w-[72%] px-4 py-2.5 rounded-2xl overflow-hidden wrap-break-word leading-relaxed *:
                ${isUser ? " bg-linear-to-r from-indigo-500 to-violet-700 text-white rounded-tr-sm" : " text-slate-200 rounded-tl-sm"}
                `}>

                {images.length > 0 && (
                    <div className='flex flex-wrap gap-3 mt-4'>
                        {images.map((image, i) => (
                            <img onClick={() => setLightBox(image)} key={i} src={image} loading='lazy' onError={(e) => e.currentTarget.remove()}
                                className='w-40 h-28 rounded-xl object-cover border border-white/10 cursor-zoom-in hover:opacity-90 transition'
                            />
                        ))}
                    </div>
                )}
                <Markdown remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => (
                            <h1 className=' text-2xl font-bold mt-5 mb-3'>{children}</h1>
                        ),
                        h2: ({ children }) => (
                            <h2 className=' text-xl font-semibold mt-4 mb-2'>{children}</h2>
                        ),
                        h3: ({ children }) => (
                            <h3 className=' text-lg font-semibold mt-3 mb-2'>{children}</h3>
                        ),
                        p: ({ children }) => (
                            <p className='mb-3 whitespace-pre-wrap wrap-break-word'>{children}</p>
                        ),
                        ul: ({ children }) => (
                            <ul className=' list-disc pl-5 space-y-1 my-2'> {children}</ul>
                        ),
                        ol: ({ children }) => (
                            <ol className=' list-decimal pl-5 space-y-1 my-2'> {children}</ol>
                        ),
                        table: ({ children }) => (
                            <div className="overflow-x-auto my-5 rounded-xl border border-white/10 shadow-lg bg-[#0d0f14]">
                                <table className="min-w-full border-collapse text-sm text-left">
                                    {children}
                                </table>
                            </div>
                        ),

                        thead: ({ children }) => (
                            <thead className="bg-white/6 text-slate-200">
                                {children}
                            </thead>
                        ),

                        tbody: ({ children }) => (
                            <tbody className="divide-y divide-white/10">
                                {children}
                            </tbody>
                        ),

                        tr: ({ children }) => (
                            <tr className="transition-colors hover:bg-white/4">
                                {children}
                            </tr>
                        ),

                        th: ({ children }) => (
                            <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wide text-slate-300 border-b border-white/10">
                                {children}
                            </th>
                        ),

                        td: ({ children }) => (
                            <td className="px-5 py-3 text-slate-300 whitespace-nowrap">
                                {children}
                            </td>
                        ),
                        a: ({ children, href }) => (
                            <a href={href} target='_blank' rel='noreferrer' className=" text-indigo-400 underline inline-flex items-center gap-2">
                                {children} <ExternalLink size={14} />
                            </a>
                        ),
                        code: ({ children, className, inline }) => {
                            const value = String(children).replace(/\n$/, "");

                            if (inline || !className) {
                                return (
                                    <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[0.9em] text-indigo-300">
                                        {value}
                                    </code>
                                );
                            }

                            const lang = className.replace("language-", "");
                            const label = lang.toUpperCase();

                            return (
                                <div className="my-5 overflow-hidden max-w-5xl rounded-[14px] border border-white/10 bg-[#0b0f14] shadow-2xl shadow-black/30">
                                    <div className="flex items-center justify-between border-b border-white/10 bg-[#171b22] px-4 py-2.5">
                                        <span className="text-xs font-medium uppercase tracking-[0.22em] text-slate-400">
                                            {label}
                                        </span>

                                        <button
                                            onClick={() => copiedCode(value)}
                                            className="flex cursor-pointer items-center gap-1 text-xs text-slate-400 transition hover:text-white"
                                        >
                                            {copyCode === value ? (
                                                <>
                                                    <Check size={14} />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy size={14} />
                                                    Copy
                                                </>
                                            )}
                                        </button>
                                    </div>

                                    <SyntaxHighlighter
                                        language={lang}
                                        style={oneDark}
                                        PreTag="div"
                                        showLineNumbers
                                        wrapLongLines={true}
                                        lineProps={() => ({
                                            style: {
                                                display: "table-row",
                                            },
                                        })}
                                        customStyle={{
                                            margin: 0,
                                            padding: "18px 20px 20px",
                                            background: "#0b0f14",
                                            borderRadius: 0,
                                            fontSize: "10px",
                                            lineHeight: "2.7",
                                            overflowX: "auto",
                                            fontFamily:
                                                "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
                                        }}
                                        lineNumberStyle={{
                                            color: "#6e7681",
                                            minWidth: "2.75rem",
                                            paddingRight: "18px",
                                            userSelect: "none",

                                        }}
                                        codeTagProps={{
                                            style: {
                                                display: "block",

                                                fontFamily:
                                                    "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
                                            },
                                        }}
                                    >
                                        {value}
                                    </SyntaxHighlighter>
                                </div>
                            );
                        }
                    }}
                >{content}</Markdown>

            </div>

            {lightBox && (
                <div className=' fixed inset-0 z-50 bg-black/80 backdrop:blur-sm flex items-center justify-center p-6'>
                    <button className='absolute cursor-pointer  p-2 right-5 top-5 text-white/80 hover:text-white bg-white/10 rounded-full' onClick={() => setLightBox(null)}>
                        <X />
                    </button>
                    <img src={lightBox} className=' object-contain max-w-[90vw] max-h-[85vw] border-white/85 border rounded-2xl shadow-2xl' />
                </div>
            )}
        </div>
    )
}

export default MessageBubble
