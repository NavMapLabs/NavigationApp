// direct communication calls to the frontend 
export type map_meta_info = {
    mapName?: string,
    mapAddr?: string,
    mapDescription?: string,
    versionName?: string,
    mapId?: string,
    // mapData: string,
    mapData?: string
}

export const getData = async (map_name : string, ) => {
    const user = "yudi";
    const url = "http://127.0.0.1:8080/map_manager/get_map";
    const params = new URLSearchParams({
        param1: map_name,
      }).toString();
    fetch(`${url}?${params}`, {
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
    })
    .catch((error) => {
        console.error("Error fetching data:", error);
    });
  };

  // maybe two parameter, json, one for map infromation, one for 
  export const createMap = async (data: any  ) => {
    const user = "yudi";

    const url = "http://127.0.0.1:8080/map_manager/create_map";
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

    const url = "http://127.0.0.1:8080/map_manager/update_map";
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
    const url = "http://127.0.0.1:8080/map_manager/delete_map";
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

  export const craftUpdateJsonObject =  ( map_info: map_meta_info, isNewVersion: Boolean) => {
    let requestBody = {
        data_type: "Map_update",
        data: {
          map_name: map_info.mapName,
          version_name: map_info.versionName,
          map_description: map_info.mapDescription,
          map_data: "dummy data"
        },
      };
    if(!isNewVersion){
        requestBody.data.map_id = map_info.mapId;
    }
    console.log(requestBody)
    return requestBody;
  };

  export const craftCreateJsonObject= (map_info: map_meta_info) => {
    let requestBody = {
        data_type: "Map_update",
        data: {
          map_name: map_info.mapName,
          version_name: map_info.versionName,
          map_address: map_info.mapAddr,
          map_description: map_info.mapDescription,
          map_data: "dummy data"
        },
      };
      console.log(requestBody)
    return requestBody;
  };