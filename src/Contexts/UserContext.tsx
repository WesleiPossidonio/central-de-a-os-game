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
  id?: number;
  name: string;
  vendas: string;
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

  useEffect(() => {
    const loadLocalStorageData = () => {
      const savedMusic = localStorage.getItem("selectedMusic");
      setSelectedMusic(savedMusic || "/music/music6.wav");
      setAudio(new Audio(savedMusic || "/music/music6.wav"));

      try {
        const personList: listPersonProps[] = JSON.parse(localStorage.getItem("listPerson") || "[]");
        const firstPlacesList: listPersonProps[] = JSON.parse(localStorage.getItem("firstPlaces") || "[]");

        const sortedFirstPlaces = firstPlacesList.sort((a, b) => Number(b.vendas) - Number(a.vendas)).slice(0, 3);

        setListPerson(personList);
        setFirstPlaces(sortedFirstPlaces);
        prevListPersonSize.current = personList.length;
      } catch (error) {
        console.error("Erro ao carregar dados do localStorage:", error);
      }
    };

    loadLocalStorageData();

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "listPerson" || event.key === "firstPlaces") {
        loadLocalStorageData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);




  // useEffect(() => {
  //   const savedMusic = localStorage.getItem("selectedMusic");
  //   if (savedMusic) {
  //     setSelectedMusic(savedMusic);
  //     setAudio(new Audio(savedMusic));
  //   } else {
  //     setAudio(new Audio("/music/music6.wav")); // Música padrão
  //   }

  //   try {
  //     const getListPerson = localStorage.getItem("listPerson");
  //     const getfirstListPerson = localStorage.getItem("firstPlaces");
  //     const personList: listPersonProps[] = JSON.parse(getListPerson || "[]");
  //     const firstPlacesList: listPersonProps[] = JSON.parse(getfirstListPerson || "[]");
  //     const firstPlaces = firstPlacesList.sort((a, b) => Number(b.vendas) - Number(a.vendas)) // Ordena por vendas
  //       .slice(0, 3);
  //     setFirstPlaces(firstPlaces)

  //     setListPerson(personList);
  //     prevListPersonSize.current = personList.length;


  //   } catch (error) {
  //     console.error("Erro ao carregar listPerson do localStorage:", error);
  //   }
  // }, [ListPerson]);


  useEffect(() => {
    const newFirstPlaces = [...ListPerson]
      .sort((a, b) => Number(b.vendas) - Number(a.vendas)) // Ordena por vendas
      .slice(0, 3);

    // Atualiza o estado uma única vez antes das verificações
    if (JSON.stringify(firstPlaces) !== JSON.stringify(newFirstPlaces)) {
      setFirstPlaces(newFirstPlaces);
    }

    // Primeiro Lugar
    if (firstPlaces[0]?.id !== newFirstPlaces[0]?.id) {
      const audioPodio = new Audio("music/music10.wav");
      setShowAnimation({ state: true, typePlaces: "first" });
      localStorage.setItem("firstPlaces", JSON.stringify(newFirstPlaces))

      audioPodio.currentTime = 0;
      audioPodio.play();

      setTimeout(() => {
        setShowAnimation({ state: false, typePlaces: "first" });
      }, 10000); // A animação dura 10 segundos
    }

    // Segundo Lugar
    else if (firstPlaces[1]?.id !== newFirstPlaces[1]?.id) {
      const audioPodio = new Audio("music/music7.wav");
      setShowAnimation({ state: true, typePlaces: "second" });
      localStorage.setItem("firstPlaces", JSON.stringify(newFirstPlaces))

      audioPodio.currentTime = 0;
      audioPodio.play();

      setTimeout(() => {
        setShowAnimation({ state: false, typePlaces: "second" });
      }, 10000); // A animação dura 10 segundos
    }

    // Terceiro Lugar
    else if (firstPlaces[2]?.id !== newFirstPlaces[2]?.id) {
      const audioPodio = new Audio("music/music8.wav");
      setShowAnimation({ state: true, typePlaces: "third" });
      localStorage.setItem("firstPlaces", JSON.stringify(newFirstPlaces))

      audioPodio.currentTime = 0;
      audioPodio.play();

      setTimeout(() => {
        setShowAnimation({ state: false, typePlaces: "third" });
      }, 5000); // A animação dura 5 segundos
    }

    // Se o tamanho da lista aumentou, toca a música
    else if (ListPerson.length > prevListPersonSize.current) {
      prevListPersonSize.current = ListPerson.length; // Atualiza a referência do tamanho anterior
      if (audio && firstPlaces[0]?.id === newFirstPlaces[0]?.id) {
        audio.currentTime = 0;
        audio.play();
      }
    }

  }, [ListPerson, firstPlaces]); // Dispara quando ListPerson muda


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

    const newList = ListPerson.filter(list => list.id !== data.id)

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
