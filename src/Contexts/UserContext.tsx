
import axios from "axios";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";

interface CreateTeamProps {
  id: number;
  nameTeam: string;
  typeOfScore: "Unidade" | "Dinheiro";
  musicSistem: {
    activate: boolean;
    music: string;
  };
  SortType: "Por Pontuação" | "Por Porcentagem";
}

interface showAnimationProps {
  state: boolean
  typePlaces: 'first' | 'second' | 'third'
}

export interface listPersonProps {
  posicao: number;
  id_vendedor?: number;
  vendedor: string;
  total_vendas: number;
  urlImage: string;
}

// interface updatePersonProps {
//   id: number;
//   vendas: string;
// }

interface UserContextType {
  handleCreateTeam: (data: CreateTeamProps) => Promise<void>;
  handleCreatePerson: (data: listPersonProps) => Promise<void>;
  handleUpdatePerson: (data: listPersonProps) => Promise<void>;
  addMusic: (music: string) => void;
  setAudio: (audio: HTMLAudioElement | null) => void;
  ListPerson: listPersonProps[];
  firstPlaces: listPersonProps[];
  selectedMusic: string;
  audio: HTMLAudioElement | null;
  showAnimation: showAnimationProps
}

interface UserContextProviderProps {
  children: ReactNode;
}

// eslint-disable-next-line react-refresh/only-export-components
export const UserContext = createContext({} as UserContextType);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [dataTeam, setDataTeam] = useState<CreateTeamProps[]>([]);
  const [ListPerson, setListPerson] = useState<listPersonProps[]>([]);
  const [selectedMusic, setSelectedMusic] = useState<string>("");
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [firstPlaces, setFirstPlaces] = useState<listPersonProps[]>([]);
  const [showAnimation, setShowAnimation] = useState<showAnimationProps>({ state: false, typePlaces: "first" });

  const prevListPersonSize = useRef(0);

  const linkApi = 'https://criardash.com/api/ranking.php?token=sDUEqMJPPV2kVh9Rof6CqhdG'
  useEffect(() => {
    const loadLocalStorageData = async () => {
      const savedMusic = localStorage.getItem("selectedMusic") || "/music/music6.wav";
      setSelectedMusic(savedMusic);
      setAudio(new Audio(savedMusic));

      try {
        const response = await axios.get(linkApi);
        const data: listPersonProps[] = response.data;

        const newData = data.map((item) => ({
          ...item,
          urlImage: `https://criardash.com/central/perfil/${item.id_vendedor}.jpg`,
        }));

        const sortedFirstPlaces = data
          .sort((a, b) => Number(b.total_vendas) - Number(a.total_vendas))
          .slice(0, 3);

        const localDataRaw = localStorage.getItem("listPerson");
        const localData: listPersonProps[] = localDataRaw ? JSON.parse(localDataRaw) : [];

        const dataChanged = JSON.stringify(localData) !== JSON.stringify(newData);

        if (dataChanged) {
          localStorage.setItem("listPerson", JSON.stringify(newData));
          setListPerson(newData);
          setFirstPlaces(sortedFirstPlaces);
          prevListPersonSize.current = newData.length;
          console.log("Dados atualizados da API.");
        } else {
          setListPerson(localData);
          setFirstPlaces(sortedFirstPlaces);
          prevListPersonSize.current = localData.length;
          console.log("Dados não mudaram.");
        }
      } catch (error) {
        console.error("Erro ao carregar dados da API:", error);
      }
    };

    loadLocalStorageData(); // chama ao montar

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "listPerson" || event.key === "firstPlaces") {
        loadLocalStorageData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Atualiza a cada 30 minutos
    const intervalId = setInterval(() => {
      console.log("Atualizando via intervalo de 30 minutos...");
      loadLocalStorageData();
    }, 30 * 60 * 1000);

    // Atualiza ao voltar para a aba
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("Atualizando ao voltar para a aba...");
        loadLocalStorageData();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);


  useEffect(() => {
    const newFirstPlaces = [...ListPerson]
      .sort((a, b) => Number(b.total_vendas) - Number(a.total_vendas))
      .slice(0, 3);

    // Detecta qual posição mudou
    const changedIndex = newFirstPlaces.findIndex(
      (item, index) => item.id_vendedor !== firstPlaces[index]?.id_vendedor
    );

    // Se mudou o pódio
    if (changedIndex !== -1) {
      const audios = [
        "music/music10.wav", // 1º lugar
        "music/music7.wav",  // 2º lugar
        "music/music8.wav",  // 3º lugar
      ];

      const durations = [10000, 10000, 5000];

      const audioPodio = new Audio(audios[changedIndex]);
      const typePlaces = changedIndex === 0 ? "first" : changedIndex === 1 ? "second" : "third";

      setShowAnimation({ state: true, typePlaces });
      localStorage.setItem("firstPlaces", JSON.stringify(newFirstPlaces));

      audioPodio.currentTime = 0;
      audioPodio.play();

      setTimeout(() => {
        setShowAnimation({ state: false, typePlaces });
      }, durations[changedIndex]);

      console.log(`Mudança detectada no ${typePlaces} lugar`);
    }

    // Se aumentou o tamanho da lista
    else if (ListPerson.length > prevListPersonSize.current) {
      prevListPersonSize.current = ListPerson.length;

      if (audio && firstPlaces[0]?.id_vendedor === newFirstPlaces[0]?.id_vendedor) {
        audio.currentTime = 0;
        audio.play();

        console.log("Novo vendedor adicionado — som tocado.");
      }
    }

    // Atualiza firstPlaces sempre no final
    if (JSON.stringify(firstPlaces) !== JSON.stringify(newFirstPlaces)) {
      setFirstPlaces(newFirstPlaces);
    }
  }, [ListPerson, firstPlaces]);

  const addMusic = (music: string) => {
    setSelectedMusic(music);
    localStorage.setItem("selectedMusic", music);
    setAudio(new Audio(music));
  };

  const handleCreateTeam = async (data: CreateTeamProps) => {
    const newTeamList = [...dataTeam, data];
    localStorage.setItem("dataTeam", JSON.stringify(newTeamList));
    setDataTeam(newTeamList);
  };

  const handleCreatePerson = async (data: listPersonProps) => {
    const newPersonList = [...ListPerson, data];
    localStorage.setItem("listPerson", JSON.stringify(newPersonList))
    setListPerson(newPersonList);
  };

  const handleUpdatePerson = async (data: listPersonProps) => {

    const newList = ListPerson.filter(list => list.id_vendedor !== data.id_vendedor)

    const listUpdated = [
      ...newList,
      data
    ]

    localStorage.setItem("listPerson", JSON.stringify(listUpdated))
    console.log(data)
  };

  return (
    <UserContext.Provider
      value={{
        handleCreateTeam,
        handleCreatePerson,
        handleUpdatePerson,
        addMusic,
        setAudio,
        ListPerson,
        selectedMusic,
        audio,
        showAnimation,
        firstPlaces,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
