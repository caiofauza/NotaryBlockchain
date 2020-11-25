import React, { useState, useEffect } from "react";
import { Avatar, Button, FormField, Grommet, Header, Text, TextInput } from 'grommet';
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { newContextComponents } from "@drizzle/react-components";
const { ContractData, ContractForm } = newContextComponents;

var acc = 0;

let url = new URL(window.location.href);

if (url.searchParams.get('acc')) {
  acc = url.searchParams.get('acc')
}

const Notary = ({ drizzle, drizzleState }) => {
  const [openFile, setOpenFile] = useState(0);
  const [recognizeFile, setRecognizeFile] = useState(0);
  const [lastTransaction, setLastTransaction] = useState("");


  const handleFile = (name, type) => {
    type === "open" ? setOpenFile(parseInt(name.length)) : setRecognizeFile(parseInt(name.length));
  };

  const handleInput = (state, inputs, file) => {
    state[inputs[2].name] = file;
  }

  useEffect(() => {
    let object = Object.keys(drizzleState["transactions"]);
    setLastTransaction(object[object.length - 1]);

  }, [drizzleState])

  return (
    <Grommet theme={customTheme}>
      <div style={{ backgroundColor: "#fcba03", height: '100vh' }}>
        <Header background="#f2f2f2" pad="small">
          <Avatar src={require("../assets/icon.png")} />
          <Text style={{ marginRight: '1vw' }}>Insper 2020.2 - Ativos Digitais e Blockchain</Text>
        </Header>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: "#fcba03", height: '200px' }}>
          <Text style={{ fontSize: '55px' }}>Notary Blockchain</Text>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: '50px' }}>
            <Text style={{ fontSize: '30px' }}>Última transação realizada</Text>
            <Text style={{ fontSize: '15px', marginLeft: '30px' }}>{lastTransaction ? lastTransaction : "----------------------------------------------------------------"}</Text>
          </div>
        </div>
        <ToastContainer />
        <div style={{ backgroundColor: "#FFFFFF", height: '200px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Text style={{ fontSize: '30px', marginTop: '50px', marginBottom: '25px' }}>Abrir firma</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="Notary"
              method="openFirm"
              labels={["firmOwner", "cpf", "signature"]}
              render={({ inputs, inputTypes, state, handleInputChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                      <FormField>
                        <TextInput placeholder="Carteira" onChange={handleInputChange} name={inputs[0].name} key={inputs[0].name} type={inputTypes[0]} style={{ width: '12vw' }} />
                      </FormField>
                      <FormField>
                        <TextInput placeholder={inputs[1].name} onChange={handleInputChange} name={inputs[1].name} key={inputs[1].name} type={inputTypes[1]} style={{ width: '12vw' }} />
                      </FormField>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '15px', marginLeft: '60px' }}>Assinatura</label>
                        <input id="signature" type="file" name="Signature" key={inputs[2].name} onClick={handleInput(state, inputs, openFile)} onChange={(e) => handleFile(e.target.files[0].name, 'open')} />
                      </div>
                    </div>
                    <Button style={{ borderColor: '#fcba03', backgroundColor: '#fcba03', color: "black", outline: 'none', marginTop: '20px' }} label="Enviar" onClick={handleSubmit} />
                  </div>
                </form>
              )}
            />
          </div>
        </div>
        <div style={{ backgroundColor: "#FFFFFF", height: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <Text style={{ fontSize: '30px', marginTop: '100px', marginBottom: '30px' }}>Reconhecer firma</Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <ContractForm
              drizzle={drizzle}
              drizzleState={drizzleState}
              contract="Notary"
              method="recognizeFirm"
              labels={["firmOwner", "cpf", "signature"]}
              sendArgs={{ "from": drizzleState.accounts[acc], "value": 20 }}
              render={({ inputs, inputTypes, state, handleInputChange, handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '50px' }}>
                      <FormField>
                        <TextInput placeholder="Carteira" onChange={handleInputChange} name={inputs[0].name} key={inputs[0].name} style={{ width: '12vw' }} />
                      </FormField>
                      <FormField>
                        <TextInput placeholder={inputs[1].name} onChange={handleInputChange} name={inputs[1].name} key={inputs[1].name} style={{ width: '12vw' }} />
                      </FormField>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <label style={{ fontSize: '15px', marginLeft: '60px' }}>Assinatura</label>
                        <input id="signature" type="file" name="Signature" key={inputs[2].name} onClick={handleInput(state, inputs, recognizeFile)} onChange={(e) => handleFile(e.target.files[0].name, 'recognize')} />
                      </div>
                    </div>
                    <Button style={{ borderColor: '#fcba03', backgroundColor: '#fcba03', color: "black", outline: 'none', marginTop: '20px' }} label="Enviar" onClick={handleSubmit} />
                  </div>
                </form>
              )}
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: "#fcba03", justifyContent: 'center', alignItems: 'center', gap: '30px', height: '150px' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: '30px', marginTop: '30px', marginBottom: '10px' }}>Última firma aberta</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="Notary"
                method="getFirms"
                methodArgs={[drizzleState.accounts[acc]]}
                render={(target) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text> CPF: {!target ? "" : target.CPF}</Text>
                    <Text> Assinatura: {!target ? "" : target.Signature}</Text>
                  </div>
                )}
              />
            </div >
          </div>
          <div>
            <img src={require("../assets/logo.png")} style={{ width: '6vw' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ fontSize: '30px', marginTop: '30px', marginBottom: '10px' }}>Última firma reconhecida</Text>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ContractData
                drizzle={drizzle}
                drizzleState={drizzleState}
                contract="Notary"
                method="getOperations"
                methodArgs={[drizzleState.accounts[acc]]}
                render={(target) => (
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Text> CPF: {!target ? "" : target.CPF}</Text>
                    <Text> Assinatura: {!target ? "" : target.Signature}</Text>
                  </div>
                )}
              />
            </div >
          </div>
        </div>
      </div>
    </Grommet>
  )
}

const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      focus: '#fcba03',
      selected: {
        background: '#fcba03'
      }
    },
    hover: {
      background: '#fcba03'
    }
  },
  select: {
    icons: {
      color: '#fcba03'
    }
  },
  button: {
    border: {
      color: "#000000"
    }
  },
});


export default Notary;