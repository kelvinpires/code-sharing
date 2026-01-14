import { Editor } from "@monaco-editor/react";
import { Check, Cloud, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { api } from "../api";
import { ShareModal } from "../components/ShareModal";
import { Select } from "../components/Select";

interface APIProps {
  id_codigo: string;
  codigo: string;
  linguagem: string;
}

export const Index = () => {
  const [code, setCode] = useState<string>();
  const [language, setLanguage] = useState<string>("javascript");
  const [codeUrl, setCodeUrl] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const { id } = useParams();

  const getCode = async (id: string) => {
    const response = await api.get(`/${id}/`);

    const data: APIProps = await response.data;

    setCode(data.codigo);
    setLanguage(data.linguagem);
    setCodeUrl(`http://localhost:5173/${data.id_codigo}`);
  };

  const newCode = async () => {
    const response = await api.post("/new/", {
      codigo: code,
      linguagem: language,
    });

    const data: APIProps = await response.data;

    setCodeUrl(`http://localhost:5173/${data.id_codigo}`);
  };

  const editCode = async (id: string) => {
    const response = await api.post(`/edit/${id}/`, {
      codigo: code,
      linguagem: language,
    });
    const data: APIProps = await response.data;

    setCodeUrl(`http://localhost:5173/${data.id_codigo}`);
  };

  const saveCode = async (id: string) => {
    await api.post(`/edit/${id}/`, {
      codigo: code,
      linguagem: language,
    });

    setIsSaved(true);

    setTimeout(() => {
      setIsSaved(false);
    }, 2000);
  };

  const handleCode = async () => {
    if (id) {
      editCode(id);
    } else {
      newCode();
    }
  };

  useEffect(() => {
    if (id) {
      getCode(id);
    }
  }, []);

  return (
    <div className="min-h-screen bg-neutral-900 py-8">
      <div
        className={`${
          language === "html" ? "max-w-full" : "max-w-7xl"
        } w-full mx-auto px-10`}
      >
        <div className="flex flex-col items-center gap-3 pb-8">
          <h2 className="text-white font-black text-4xl">Crie & Compartilhe</h2>
          <h2 className="text-white font-bold text-3xl">
            Seu código facilmente.
          </h2>
        </div>
        <div className="mb-4 flex justify-between">
          <Select setLanguage={setLanguage} language={language} />

          <div className="flex items-center gap-4">
            {id && (
              <button
                onClick={() => saveCode(id)}
                className="flex items-center gap-2 rounded-xl bg-neutral-100 text-indigo-600 py-2 px-3 hover:bg-neutral-300 transition-all cursor-pointer"
              >
                {isSaved ? <Check size={24} /> : <Cloud size={24} />}
                Salvar
              </button>
            )}
            <ShareModal url={codeUrl}>
              <button
                onClick={handleCode}
                className="flex items-center gap-2 rounded-xl hover:bg-indigo-600 transition-all cursor-pointer bg-indigo-500 text-white py-2 px-3"
              >
                <Share2 size={24} />
                Compartilhar
              </button>
            </ShareModal>
          </div>
        </div>
        {/* Editor */}

        <div className="h-160 overflow-hidden">
          <div className="h-full flex gap-5">
            <Editor
              width={`${language === "html" ? "50%" : "100%"}`}
              theme="vs-dark"
              language={language}
              options={{
                acceptSuggestionOnCommitCharacter: true,
                acceptSuggestionOnEnter: "on",
                accessibilitySupport: "auto",
                accessibilityPageSize: 10,
                ariaLabel: "Editor content",
                minimap: {
                  enabled: false,
                },
              }}
              onChange={(e) => setCode(e)}
              value={code}
            />
            <iframe
              className={`${
                language === "html" ? "block w-1/2 h-full bg-white" : "hidden"
              }`}
              srcDoc={code}
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};
