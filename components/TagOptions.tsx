import * as React from 'react';
import { Chip } from 'react-native-paper';

type TagOptionsProps = {
    tags: string[],
    selectedTags: string[],
    onTagPress: (tag: string) => void
    onTagRemove: (tag: string) => void
}

const TagOptions = (props: TagOptionsProps) => {
    return (
        <>
            {props.tags.map((tag) => (
                <Chip key={tag} 
                      mode="outlined" 
                      selected={props.selectedTags.includes(tag)}
                      onPress={() => props.onTagPress(tag)}
                      onClose={() => props.onTagRemove(tag)}>
                    {tag}
                </Chip>
            ))}
        </>
    )
}

export default TagOptions;