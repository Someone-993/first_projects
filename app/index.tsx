import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const excuses = [
    'Интернет не работал',
    'Собака съела домашку',
    'Я ждал вдохновения',
    'Слишком хорошая погода, чтобы учиться',
    'Я тренировался ментально',
    'Внезапно началась зима',
    'Планеты не так встали',
    'Я устал морально',
    'Это было стратегическое бездействие',
    'Я думал об этом весь день — и устал',
];

export default function Index() {
    const [excuse, setExcuse] = useState('');

    const generateExcuse = () => {
        const randomIndex = Math.floor(Math.random() * excuses.length);
        setExcuse(excuses[randomIndex]);
        console.log('Генерируем:', excuses[randomIndex]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.title}>Генератор отмазок</Text>

                <TouchableOpacity style={styles.button} onPressIn={generateExcuse}>
                    <Text style={styles.buttonText}>Почему я ничего не сделал?</Text>
                </TouchableOpacity>

                {excuse !== '' && <Text style={styles.excuse}>{excuse}</Text>}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fefefe',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
    },
    excuse: {
        marginTop: 30,
        fontSize: 20,
        color: '#444',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
