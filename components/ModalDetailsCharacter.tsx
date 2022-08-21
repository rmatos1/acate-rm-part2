import { Modal, View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { useContext } from "react";

import { ModalVisibility } from "./ModalVisibilityContext";

const ModalDetailsCharacter = (props: any) => {

    const context = useContext(ModalVisibility);

    const renderDescription = (label: string, description: string) => {

        return(
            <View style={{ flexDirection: 'row', marginBottom: 5 }}>

                <Text style={styles.label}>{ label }:</Text>

                <Text style={styles.text}>{ description }</Text>

            </View>
        )
    }

    if(props.data) {

        const { image, name, species, status, gender, location, origin } = props.data;

        return(
            <Modal
                animationType="slide"
                onRequestClose={() => context.toggleVisibility(false)}
                visible={context.modalVisible}
            >

                <View style={{ flex: 1 }}>

                    <Image style={styles.imgModal} source={{ uri: image }} />

                    <View style={{ padding: 15, flex: 1 }}>

                        { renderDescription('Name', name) }

                        { renderDescription('Species', species) }
                        
                        { renderDescription('Status', status) }

                        { renderDescription('Gender', gender) }

                        { renderDescription('Location', location.name) }

                        { renderDescription('Origin', origin.name) }

                    </View>

                    <Pressable 
                        style={styles.closeButton}
                        onPress={() => context.toggleVisibility(false)}
                    >
                        <Text style={{ fontSize: 15, color: '#939393' }}>Return</Text>
                    </Pressable>

                </View>

            </Modal>
        )
    }
    
    return null;
}

const styles = StyleSheet.create({
    imgModal: {
        width: '100%',
        flex: 1,
        objectFit: 'cover'
    },
    label: {
        color: '#868686',
        fontSize: 16,
        fontWeight: 'bold',
        width: 100
    },
    text: {
        color: '#909090',
        fontSize: 16,
        flex: 1
    },
    closeButton: { 
        height: 50, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderTopWidth: 1,
        borderTopColor: '#e5e5e5' 
    }
})

export default ModalDetailsCharacter;