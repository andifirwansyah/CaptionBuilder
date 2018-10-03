import React, { Component } from 'react';
import {StyleSheet,Image,TouchableOpacity,Clipboard,ToastAndroid} from 'react-native';
import {
    Header,
    Container,
    Content,
    Button,
    Card,
    CardItem,
    Text,
    Body,
    Title,
    Icon,
    Left,
    Right,
    List,
    ListItem,
    Spinner
} from 'native-base';

import { upload,getTag,cari } from "./Utils";

import { ImagePicker } from "expo";

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            image: null,
            quotes : [],
            isLoading : false,
            log : ""
        }
    }


    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({quality: 0.4})

        if(result.cancelled){
            return
        }

        this.setState({
            image:result
        })
        
    }

    generate = () => {
        if(this.state.image === null){
            return
        }
        this.setState({
            isLoading: true,
            log: "Upload gambar"
        })
        upload(this.state.image, (res) => {
            this.setState({
                log:"Analisa gambar"
            })
            getTag(res.uploaded[0].id, (tag) => {
                let word = tag.results[0].tags;
                this.setState({
                    log: "Mencari Quote"
                })
                cari(word, (data) => {
                    
                        this.setState({
                            quotes: data,
                            isLoading : false
                        })
                })
            })
        })
    }

    copyQuote = (index) => {
        let qoutelist = this.state.quotes;
        let selected = qoutelist[index];
        console.log(selected);
        let compose = selected.quote+"\n\n -"+selected.author;
        Clipboard.setString(compose);
        alert("Copied");
    }

    render(){
        let quotes = this.state.quotes;
        let list = [];
        quotes.forEach((quote,key) => {
            list.push(
                <ListItem key={key}>
                    <Left>
                        <Body>
                            <Text>{"\"" + quote.quote + "\"\n\n"}</Text>
                            <Text style={{ fontStyle: "italic" }} >{"-" + quote.author}</Text>
                        </Body>
                    </Left>
                    <Right>
                        <Button transparent>
                            <Icon name="content-copy" type="MaterialCommunityIcons" style={{ color: '#8642f4' }} onPress={() => this.copyQuote(key)} />
                        </Button>
                    </Right>
                </ListItem>
            )
        });
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>Generate Your Caption</Title>
                    </Body>
                </Header>
                <Card>
                    <CardItem >
                        {
                            this.state.image ?
                                <TouchableOpacity onPress={this.pickImage}>

                                    <Image style={{ width: 300, height: 300, resizeMode: 'contain' }} source={{uri :this.state.image.uri}} />
                                </TouchableOpacity>
                            :
                                <Body style={styles.wrapUpload}>
                                    <Icon onPress={this.pickImage} name="camera" style={styles.iconUpload} />
                                    <Text>Upload Your Image Here!</Text>
                                </Body>
                        }
                    </CardItem>
                    <CardItem>
                        <Body>
                            {
                                this.state.isLoading ? 
                                [<Spinner key={0} />,
                                <Text key={1}>{this.state.log}</Text>]
                                :
                                    <Button onPress={this.generate} full style={{ backgroundColor: '#8642f4' }}>
                                        <Icon name='loop' type="MaterialIcons" />
                                        <Text>Create Caption</Text>
                                    </Button>
                            }
                        </Body>
                    </CardItem>
                </Card>
                <Content>
                    <Card>
                        <List>
                           {list}
                        </List>
                    </Card>
                </Content>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    wrapUpload: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 200,
        backgroundColor: '#f4f4f4'
    },
    iconUpload: {
        fontSize: 40,
        color: '#8642f4'
    }
});
export default Home;