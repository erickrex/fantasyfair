
import React, {useState, useRef, useEffect} from 'react'
import Image from 'next/image'
import next from 'next'
import Wrestler from '../components/wrestler'

function DragNDrop({data, winners}) {

    const [list, setList] = useState(data);
    const [list2, setList2] = useState(winners);

    const [dragging, setDragging] = useState(false);
    
    useEffect(() => {
        setList(data);
    }, [setList, data])

    useEffect(() => {
        setList2(winners);
    }, [setList2, winners])

    const dragItem = useRef();
    const dragItemNode = useRef();
  
    const handletDragStart = (e, item) => {
        console.log('Starting to drag', item)

        dragItemNode.current = e.target;
        dragItemNode.current.addEventListener('dragend', handleDragEnd)
        dragItem.current = item;

        setTimeout(() => {
            setDragging(true); 
        },0)       
    }

    const handleDragEnter = (e, targetItem, setWhat) => {
        console.log('Entering a drag target', targetItem)
        if (dragItemNode.current !== e.target) {
            console.log('Target is NOT the same as dragged item')
            setWhat(oldList => {
                let newList = JSON.parse(JSON.stringify(oldList))
                newList.splice(targetItem.itemI, 0, newList.splice(dragItem.current.itemI,1))
                dragItem.current = targetItem;
                
                console.log({newList})
                console.log(targetItem)
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
        
        if (dragItem.current === item && dragItem.current.itemI === item.itemI) {
            return "wrestler current"
        }
        return "wrestler"
    }

    if (list) {
        return (
            <>              
            <div className="dnd-group">  
                {
                    list2.map((item, itemI) => (
                  
                  <div key={item} draggable  onDragStart={(e) => handletDragStart(e, {itemI})} onDragEnter={dragging?(e) => {handleDragEnter(e, {itemI}, setList2)}:null} className={dragging?getStyles({itemI}):"wrestler"}>
                      {item}
                  <Image
                    src={`/images/${item}.png`}
                    alt=""
                    width="100"
                    height="100"
                    />
                  </div>
                  ))
                  }
            </div> 
            <div className="drag-n-drop">
            {
                    list.map((item, itemI) => (
                  
                  <div key={item} draggable  onDragStart={(e) => handletDragStart(e, {itemI})} onDragEnter={dragging?(e) => {handleDragEnter(e, {itemI}, setList)}:null} className={dragging?getStyles({itemI}):"wrestler"}>
                      {item}
                  <Image
                    src={`/images/${item}.png`}
                    alt=""
                    width="100"
                    height="100"
                    />
                  </div>
                  ))
                  }
            </div>
            
            </>
        )
    } else { return null}

}

export default DragNDrop;
