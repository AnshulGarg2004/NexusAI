import { Check, Code2, Copy, Eye, PanelRightClose, PanelRightOpen } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Editor from "@monaco-editor/react"
import { easeInOut, motion } from "motion/react"

const Artifact = () => {
    const { artifacts } = useSelector(state => state.message);
    const [collapsed, setCollapsed] = useState(false);
    const [tab, setTab] = useState("code");
    const [copied, setCopied] = useState(false);
    const [activeFile, setActiveFile] = useState(0)
    const currentArtifact = artifacts[0];
    const files = useMemo(() => currentArtifact?.files || [], [currentArtifact]);

    useEffect(() => {
        if (activeFile >= files.length) {
            setActiveFile(0);
        }
    }, [activeFile, files.length]);

    console.log(artifacts);
    
    if (!artifacts.length) return null;
    
    console.log("curr arti: ",  currentArtifact);
    
    const file = files[activeFile] || files[0] || null;
    const fileContent = file?.content || "";
    const html = files.find(f => f.name === "index.html")?.content || "";
    const css = files.find(f => f.name === "style.css")?.content || "";
    const js = files.find(f => f.name === "script.js")?.content || "";
    
    const canPreview = Boolean(html);

    console.log("file: ", file);
    
    
    
    const previewDoc = `
    <!DOCTYPE html>
    <html lang="en">    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
    ${css || ""}
    </style>
    </head>    
    <body>
    ${html}
    <script>
    ${js || ""}  
    </script>  
    
    </body>    
    
    

</html>
`
const copyCode = async () => {
     await navigator.clipboard.writeText(fileContent);
     setCopied(true);

     setTimeout(() => {setCopied(false)}, 2000)
}

const detectLang = (fileName = "") => {
    const name = fileName.toLowerCase();   

    if (name.endsWith(".tsx")) {
        return "typescript";
    }    

    if (name.endsWith(".ts")) {
        return "typescript";
    }    

    if (name.endsWith(".jsx")) {
        return "javascript";
    }    

    if (name.endsWith(".js")) {
        return "javascript";
    }    

    if (name.endsWith(".html") || name.endsWith(".htm")) {
        return "html";
    }    

    if (name.endsWith(".css")) {
        return "css";
    }    

    if (name.endsWith(".json")) {
        return "json";
    }    

    if (
        name.endsWith(".cpp") ||
        name.endsWith(".cc") ||
        name.endsWith(".cxx") ||
        name.endsWith(".hpp") ||
        name.endsWith(".hh") ||
        name.endsWith(".hxx") ||
        name.endsWith(".c") ||
        name.endsWith(".h")
    ) {
        return "cpp";
    }    

    if (name.endsWith(".java")) {
        return "java";
    }    

    if(name.endsWith(".py")) {
        return "python";
    }    

    return "plaintext";
};    



    return (
        <motion.aside
            initial={{ width: 350 }}
            animate={{ width: collapsed ? 52 : 350 }}
            transition={{ duration: 0.25, ease: easeInOut }}
            className="hidden shrink-0 lg:flex h-full flex-col overflow-hidden border-l border-white/[0.06] bg-[#0d0f14]"
        >
            {!collapsed ? (
                <div className="flex h-full min-w-0 flex-col">
                    <div className="flex h-14 shrink-0 items-center gap-3 border-b border-white/[0.06] px-3">
                        <button
                            onClick={() => setCollapsed(true)}
                            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border-none bg-transparent text-slate-500 transition-colors duration-150 hover:bg-white/[0.05] hover:text-slate-200 cursor-pointer"
                            aria-label="Collapse artifacts panel"
                        >
                            <PanelRightClose size={16} />
                        </button>

                        <div className="flex h-8 min-w-0 flex-1 items-center gap-2">
                            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-indigo-500/20 bg-indigo-500/10">
                                <Code2 size={13} className="text-indigo-400" />
                            </div>

                            <div className="min-w-0 flex-1 truncate text-[13px] font-medium leading-8 text-slate-200">
                                {currentArtifact.title}
                            </div>
                        </div>

                        <div className=" flex items-center gap-1 shrink-0">
                            <button onClick={copyCode} className=" duration-150 flex items-center gap-1.5 px-2.5  py-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/[0.05] rounded-lg transition-colors bg-transparent border-none cursor-pointer ">
                                {copied ? <Check size={15} /> : <Copy size={15} />}
                            </button>
                            {canPreview && (
                                <div className="flex  items-center gap-1 bg-white/[0.04] border border-white/[0.06] p-1 rounded-lg">
                                    <button onClick={() => setTab("code")} className={` flex items-center rounded-md px-2.5 gap-1.5 py-1 font-medium text-[11px] transition-colors duration-150 
                        ${tab == "code" ? " bg-indigo-500 text-white " : "text-slate-500 hover:text-slate-200"}
                        `}
                                    >
                                        <Code2 size={11} /> Code
                                    </button>
                                    <button onClick={() => setTab("preview")} className={` flex items-center rounded-md px-2.5 gap-1.5 py-1 font-medium text-[11px] transition-colors duration-150 
                        ${tab == "preview" ? " bg-indigo-500 text-white " : "text-slate-500 hover:text-slate-200"}
                        `}>
                                        <Eye />  Preview
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>



                    {tab === "code" && (
                        <div className="flex h-auto border-b border-white/[0.06] overflow-x-auto shrink-0 h-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">

                            {files.map((file, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveFile(index)}
                                    className={` font-medium whitespace-nowrap transition-colors duration-150 flex min-w-0 items-center gap-2 rounded-lg px-4 py-2 text-[11px]  hover:bg-white/[0.05] relative cursor-pointer bg-transparent hover:text-slate-200
                                        ${activeFile === index ? "text-indigo-400" : " text-slate-500 hover:text-slate-300"}
                                        `}
                                >
                                    <Code2 size={13} className="shrink-0 text-slate-500" />
                                    <span className="truncate">{file.name}</span>

                                    {activeFile === index && <div className=" absolute bottom-0 left-0 right-0 h-px bg-slate-500 rounded-t-full" />}
                                </button>
                            ))}

                        </div>
                    )}

                    <div className=" flex-1  overflow-hidden">
                        {tab === "preview" && canPreview ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className=" w-full h-full"
                            >

                                <iframe title="Preview" srcDoc={previewDoc} className="h-full w-full bg-white" />

                            </motion.div>
                        ) : (
                            <motion.div
                            initial={{opacity : 0}}
                            animate={{opacity : 1}}
                            transition={{duration : 0.5}}
                            className="w-full h-full"
                            >
                                <Editor
                                height="100%"
                                path={file?.name || "artifact.txt"}
                                theme="vs-dark"
                                language={detectLang(file?.name)}
                                value={fileContent}
                                options={{readOnly : true, minimap : {enabled : false}, fontSize : 13, wordWrap : "on", automaticLayout : true, scrollBeyondLastLine : false, padding : {top : 16}, lineNumbers : "on", renderLineHighlight : "none"}}
                                />
                            </motion.div>
                        )}

                    </div>
                </div>
            ) : (
                <div className="hidden lg:flex flex-col h-full w-16 shrink-0 border-l border-white/[0.06] bg-[#0d0f14]">
                    <div className="flex h-14 items-center justify-center border-b border-white/[0.06]">
                        <button
                            onClick={() => setCollapsed(false)}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-colors hover:bg-white/[0.05] hover:text-slate-200"
                            aria-label="Collapse artifacts panel"
                        >
                            <PanelRightOpen size={16} />
                        </button>
                    </div>

                    <div className="flex flex-1 items-center justify-center overflow-hidden">
                        <span
                            style={{
                                writingMode: "vertical-rl",

                            }}
                            className="text-[10px] font-medium uppercase tracking-[0.3em] text-slate-500"
                        >
                            {currentArtifact?.title}
                        </span>
                    </div>
                </div>
            )}

        </motion.aside>
    );
};

export default Artifact;
