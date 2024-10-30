import { NavMapState } from "@/store/NavMapSlice"
import { deSerializationMapData } from "./mapDataSerialization"
// direct communication calls to the frontend 
export type map_meta = {
  mapName: string,
  mapAddr: string,
  mapDescription: string,
  versionName: string,
  mapId: string,
}

export type map_update_info = {
    mapName?: string,
    mapAddr?: string,
    mapDescription?: string,
    versionName?: string,
    mapId?: string,
    mapData: string
}

export type map_data_by_id = {
  mapId: string,
  mapData: NavMapState
}

const prefix = "http://127.0.0.1:8082/map_manager/"


export const getDataById = async (map_id : string ): Promise<NavMapState | undefined> => {
  const user = "yudi";
  const url = prefix +"get_map_data";
  const params = new URLSearchParams({
      param1: map_id,
    }).toString();
  const mapData: NavMapState | undefined = await fetch(`${url}?${params}`, {
  method: "GET",
  headers: new Headers({
      Authorization: `Bearer ${user}`,
      "Content-Type": "application/json",
  }),
  })
  .then((response) => {
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then((jsonResponse) => {
      console.log(jsonResponse);
      const mapData = deSerializationMapData(jsonResponse.map_data);
      console.log(mapData);
      return mapData;
  })
  .catch((error) => {
      console.error("Error fetching data:", error);
      return undefined;
  });


  return mapData;
};

export const getMetaDataById = async (map_id : string ): Promise<map_meta | undefined> => {
  const user = "yudi";
  const url = prefix +"id_to_meta";
  const params = new URLSearchParams({
      param1: map_id,
    }).toString();
  const metaData: map_meta | undefined = await fetch(`${url}?${params}`, {
  method: "GET",
  headers: new Headers({
      Authorization: `Bearer ${user}`,
      "Content-Type": "application/json",
  }),
  })
  .then((response) => {
      if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then((jsonResponse) => {
    const data: map_meta = {
      mapName: "Example Map",
      mapAddr: "123 Example St",
      mapDescription: "A detailed description of the example map.",
      versionName: "1.0",
      mapId: "example123"
    };
    const metaData : map_meta = {
      mapAddr : jsonResponse["map_addr"],
      mapDescription : jsonResponse["map_description"],
      mapId : jsonResponse["map_id"],
      mapName : jsonResponse["map_name"],
      versionName : jsonResponse["version_name"],
    }
    
    return metaData;
  })
  .catch((error) => {
      console.error("Error fetching data:", error);
      return undefined;
  });
  return metaData;
};
export const search = async (map_name : string, ):Promise<{ name: string; owner: string; updated: string; id: string }[]> =>  {
    const user = "yudi";
    const url = prefix +"get_map_meta_info";
    const params = new URLSearchParams({
        param1: map_name,
      }).toString();
    const mapMeta: any = await fetch(`${url}?${params}`, {
    method: "GET",
    headers: new Headers({
        Authorization: `Bearer ${user}`,
        "Content-Type": "application/json",
    }),
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((jsonResponse) => {
        const mapMeta = jsonResponse
        console.log(mapMeta);
        let files = processSearchResult(mapMeta);
        console.log(files)
        return files
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });

    return mapMeta;
  };

  // maybe two parameter, json, one for map infromation, one for 
  export const createMap = async (data: any  ) => {
    const user = "yudi";

    const url = prefix +"create_map";
    fetch(`${url}`, {
    method: "POST",
    headers: new Headers({
        Authorization: `Bearer ${user}`,
        "Content-Type": "application/json",

    }),
    body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((jsonResponse) => {
        console.log(jsonResponse);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  };

  export const updateMap = async (data: any  ) => {
    const user = "yudi";

    const url = prefix +"update_map";
    fetch(`${url}`, {
    method: "PUT",
    headers: new Headers({
        Authorization: `Bearer ${user}`,
        "Content-Type": "application/json",

    }),
    body: JSON.stringify(data),
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((jsonResponse) => {
        console.log(jsonResponse);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  };

  export const deleteMap = async (id : string ) => {
    const user = "yudi";
    // const requestBody = {
    //     datatype: "Map_update",
    //     data: {
    //       map_id: id
    //     },
    //   };
    const url = prefix +"delete_map";
    const params = new URLSearchParams({
        param1: id,
      }).toString();
    fetch(`${url}?${params}`, {
    method: "DELETE",
    headers: new Headers({
        Authorization: `Bearer ${user}`,
        "Content-Type": "application/json", // don't need it will delete this later

    }),
    // body:  JSON.stringify(requestBody),
    })
    .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then((jsonResponse) => {
        console.log(jsonResponse);
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  };

  export const craftUpdateJsonObject =  ( map_info: map_update_info, isNewVersion: Boolean) => {
    let requestBody = {
        data: {
          map_name: map_info.mapName,
          version_name: map_info.versionName,
          map_description: map_info.mapDescription,
          // map_data: "dummy data"
          map_data: map_info.mapData
        },
      };
    if(!isNewVersion){
        requestBody.data.map_id = map_info.mapId;
    }
    console.log(requestBody)
    return requestBody;
  };

  export const craftCreateJsonObject= (map_info: map_update_info) => {
    let requestBody = {
        data: {
          map_name: map_info.mapName,
          version_name: map_info.versionName,
          map_address: map_info.mapAddr,
          map_description: map_info.mapDescription,
          map_data: map_info.mapData
        },
      };
      console.log(requestBody)
    return requestBody;
  };

  export const processSearchResult = (dataJson :any) => {
    console.log(dataJson)
    const count = dataJson["data"]["variations_count"]
    let files: { name: string; owner: string; updated: string; id: string }[] = [];
    for (let i:number = count; i > 0 ; i--){
      const map = dataJson["data"]["variations"][i]
      // console.log(map)
      files.push({name: map.version_name, owner: map.map_editor, updated: map.modified_date, id: map.map_id})
    }
    return files
  }