'use client';
import { useState, DragEvent } from "react";

interface Folder {
  [key: string] : {
    name: string;
    items: Array<{
      name: string;
      id: string;
    }>;
  }
}
const folders : Folder = {
  "folderid1":  {
      "name": "Project Folder 1",
      "items": [{name: "item1.a", id: "item1.a"}, {name: "item1.b", id: "item1.b"}, {name: "item1.c", id: "item1.c"}]
  },
  "folderid2": {
      "name": "Project Folder 2",
      "items": [{name: "item2.a", id: "item2.a"}, {name: "item2.b", id: "item2.b"}, {name: "item2.c", id: "item2.c"}]
  },
  "folderid3": {
      "name": "Project Folder 3",
      "items": [{name: "item3.a", id: "item3.a"}, {name: "item3.b", id: "item3.b"}, {name: "item3.c", id: "item3.c"}]
  }
};

export default function Home() {
  const [selectedFolder, setSelectedFolder] = useState<string>("folderid1");
  const [folderMap, setFolderMap] = useState(folders);
  const [draggedItemId, setDraggedItemId] = useState('');

  const folderClickHandler =  (folderID: string) => {
    setSelectedFolder(folderID);
  }

  const dragHandler = (itemId: string) => {
   setDraggedItemId(itemId);
  }

  const dropHandler = (fid: string) => {
    const folderMapNew : Folder = JSON.parse(JSON.stringify(folderMap));
    const draggedItemList = folderMapNew[selectedFolder].items.map(item => item.id);  // using selectedFolder here because items are being dragged from the selected folder only.
    const draggedItemIndex = draggedItemList.indexOf(draggedItemId);
    let draggedItem : Array<{
      name: string;
      id: string;
    }> = [];
    if (draggedItemIndex > -1) { 
      draggedItem = folderMapNew[selectedFolder].items.splice(draggedItemIndex, 1); 
    }

    if (draggedItem.length) folderMapNew[fid].items.push(draggedItem[0]);

    setFolderMap(folderMapNew);
  }

  const allowDrop = (e: DragEvent) => {
    e.preventDefault();
  }
  return (
    <>
    <header>
      <h2>Marvin Assignment</h2>
    </header>
    <main>
      <div className="leftSection">
        <ol>
          {Object.keys(folderMap).map((fid: string, ind) => {
            return <li className={fid === selectedFolder ? "selected-folder" : ''} onDragOver={allowDrop} onDrop={dropHandler.bind(null, fid)} onClick={folderClickHandler.bind(null, fid)} key={fid}>{folderMap[fid].name}&nbsp;&nbsp;({folderMap[fid].items.length} items)</li>
          })}
        </ol>
      </div>
      <div className="rightSection">
        <h3>{folderMap[selectedFolder].name}</h3>
        <ol>
        {folderMap[selectedFolder].items.map((item) => {
          return <li draggable="true" key={item.id} onDrag={dragHandler.bind(null, item.id)}>{item.name}</li>
        })}
        </ol>
      </div>
    </main>
    </>
  );
}
