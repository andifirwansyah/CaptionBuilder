import React, { Component } from 'react';
import {StyleSheet} from 'react-native';
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
    ListItem
} from 'native-base';

class Home extends Component{
    render(){
        return(
            <Container>
                <Header>
                    <Body>
                        <Title>Generate Your Caption</Title>
                    </Body>
                </Header>
                <Card>
                    <CardItem>
                        <Body style={styles.wrapUpload}>
                            <Icon name="camera" style={styles.iconUpload} onPress={() => alert("You have uploaded the image")}/>
                            <Text>Upload Your Image Here!</Text>
                        </Body>
                    </CardItem>
                    <CardItem>
                        <Body>
                        <Button full style={{backgroundColor:'#8642f4'}}>
                            <Icon name='loop' type="MaterialIcons"/>
                            <Text>Create Caption</Text>
                        </Button>
                        </Body>
                    </CardItem>
                </Card>
                <Content>
                    <Card>
                        <List>
                            <ListItem>
                                <Left>
                                    <Text>Masalah hidup seperti ombak tepi pantai, ia akan datang tapi pada saatnya ia akan pergi.</Text>
                                </Left>
                                <Right>
                                    <Button transparent>
                                        <Icon name="content-copy" type="MaterialCommunityIcons" style={{color:'#8642f4'}} onPress={() => alert("Copied")}/>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Anda tidak dapat menyeberangi lautan sampai Anda mempunyai keberanian untuk melupakan pantai.</Text>
                                </Left>
                                <Right>
                                    <Button transparent>
                                        <Icon name="content-copy" type="MaterialCommunityIcons" style={{color:'#8642f4'}} onPress={() => alert("Copied")}/>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                    <Text>Engkau tak akan bisa menyeberangi samudera kecuali engkau punya keberanian kehilangan kontak pandang dengan garis pantai.</Text>
                                </Left>
                                <Right>
                                    <Button transparent>
                                        <Icon name="content-copy" type="MaterialCommunityIcons" style={{color:'#8642f4'}} onPress={() => alert("Copied")}/>
                                    </Button>
                                </Right>
                            </ListItem>
                            <ListItem>
                                <Left>
                                <Text>Orang yang menempuh jarak terjauh umumnya orang yang bersedia untuk
                                    melakukannya dan yang berani. Hal yang pasti adalah bahwa perahu tidak akan pernah berada jauh dari pantai.</Text>
                                </Left>
                                <Right>
                                    <Button transparent>
                                        <Icon name="content-copy" type="MaterialCommunityIcons" style={{ color: '#8642f4'}} onPress={() => alert("Copied")} />
                                    </Button>
                                </Right>
                            </ListItem>
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
        height: 300,
        backgroundColor: '#f4f4f4'
    },
    iconUpload: {
        fontSize: 40,
        color: '#8642f4'
    }
});
export default Home;