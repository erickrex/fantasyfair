import React, {useState, useRef, useEffect} from 'react'

function DragNDrop({data}) {

    const [list, setList] = useState(data); 
    const [dragging, setDragging] = useState(false);

    useEffect(() => {
        setList(data);
    }, [setList, data])

    const dragItem = useRef();
    const dragItemNode = useRef();
    
    const handletDragStart = (e, item) => {

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true); 
        },0)       
    }
    
    const handleDragEnter = (e, targetItem) => {
        if (dragItemNode.current !== e.target) {
            setList(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList[targetItem.grpI].items.splice(targetItem.itemI, 0, newList[dragItem.current.grpI].items.splice(dragItem.current.itemI,1)[0])
                dragItem.current = targetItem;
               
                return newList
            })
        }
    }    
    
    
    const handleDragEnd = (e) => {
        setDragging(false);
        dragItem.current = null;
        dragItemNode.current.removeEventListener('dragend', handleDragEnd)
        dragItemNode.current = null;
    }
    const getStyles = (item) => {
        if (dragItem.current.grpI === item.grpI && dragItem.current.itemI === item.itemI) {
            return "dnd-item current"
        }
        return "dnd-item"
    }
    
    if (list) {
        return (                
            <div className="drag-n-drop">
            {list.map((grp, grpI) => ( 
              <div key={grp.title} onDragEnter={dragging && !grp.items.length?(e) => handleDragEnter(e,{grpI, itemI: 0}):null} className="dnd-group">
                {grp.items.map((item, itemI) => (
                  
                  <div draggable key={item}  onDragStart={(e) => handletDragStart(e, {grpI, itemI})} onDragEnter={dragging?(e) => {handleDragEnter(e, {grpI, itemI})}:null} className={dragging?getStyles({grpI, itemI}):"dnd-item"}>
                    {item}
                    <Image
                    src={`/images/${item}.png`}
                    alt=""
                    width="100"
                    height="100"
                    />
                  
                  </div>  
                ))}
                <div className={dragging?getStyles({grpI, itemI: grp.items.length+1}):"invisible"} onDragEnter={dragging ?(e) => {handleDragEnter(e, {grpI, itemI: grp.items.length})}:null} ></div> 
                    
              </div>
            ))}
            
            </div>
        )
    } else { return null}

}

export default DragNDrop;
