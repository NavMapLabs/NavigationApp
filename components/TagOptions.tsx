import * as React from 'react';
import { Chip } from 'react-native-paper';

type TagOptionsProps = {
    tags: string[],
    selectedTags: string[],
    onTagPress: (tag: string) => void
    onTagRemove: (tag: string) => void
}

const TagOptions = (props: TagOptionsProps) => {
    const isSelected = (tag: string) => {
        return props.selectedTags.includes(tag);
    }

    return (
        <>
            {props.tags.map((tag) => (
                <Chip key={tag} 
                      mode="flat" 
                      selected={isSelected(tag)}
                      onPress={() => props.onTagPress(tag)}
                      onClose={() => props.onTagRemove(tag)}
                      compact={true}
                      elevated={true}
                        style={{margin: 5,
                                backgroundColor: isSelected(tag) ? "#f5f5f5" : "white",
                                borderColor: isSelected(tag) ? "#f5f5f5" : "#f5f5f5",
                                borderWidth: 1,
                                borderRadius: 20,
                                marginHorizontal: 5,
                        }}
                      >
                    {tag}
                </Chip>
            ))}
        </>
    )
}

export default TagOptions;