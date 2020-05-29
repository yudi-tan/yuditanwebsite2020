import React from "react";
import moment from "moment";
import OutsideClickHandler from "react-outside-click-handler";
import Head from "next/head";

class TerminalComponent extends React.Component {
  _input;

  state = {
    currCmd: "",
    pastCmds: [], // Each cmd obj looks like this {valid: bool, cmd: string, output: string}
  };

  componentDidUpdate(prevProps, prevState) {
    this._input.focus();
  }

  componentDidMount() {
    this._input.focus();
    document.addEventListener("keydown", this.clearFunc, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.clearFunc, false);
  }

  // Listens for the ctrl + l shortcut to clear contents on screen.
  clearFunc = e => {
    if (e.ctrlKey && e.which == 76) {
      this.setState({ currCmd: "", pastCmds: [] });
    }
  };

  // Takes in a cmd string and returns a cmd obj {valid: bool, cmd: string, output: string}
  transformCmd = cmd => {
    switch (cmd) {
      case "help":
        return {
          valid: true,
          cmd,
          output: "The available commands are: 'clear', 'help', 'email', 'github', 'resume' and 'linkedin'. ",
        };
      case "email":
        return {
          valid: true,
          cmd,
          output: "Email: yuditan1998 at gmail.com",
        };
      case "github":
        return {
          valid: true,
          cmd,
          output: "https://github.com/YudiTan",
        };
      case "resume":
        return {
          valid: true,
          cmd,
          output: "https://drive.google.com/file/d/1WVZrES8Ia_34K-xSOrt9g6sf8Kx_tzlp/view?usp=sharing",
        };
      case "linkedin":
        return {
          valid: true,
          cmd,
          output: "https://www.linkedin.com/in/yuditan/",
        };
      default:
        return {
          valid: false,
          cmd,
          output: `zsh: command not found: ${cmd} - Try running the 'help' command.`,
        };
    }
  };

  newCmd = e => {
    if (e.keyCode == 13) {
      // If user pressed enter, push this cmd into pastCmds and reset
      // currCmd to blank
      if (this.state.currCmd == "clear") {
        this.setState({ currCmd: "", pastCmds: [] });
        return;
      }
      const newCmd = this.transformCmd(this.state.currCmd);
      this.setState({
        pastCmds: [...this.state.pastCmds, newCmd],
        currCmd: "",
      });
    }
  };

  render() {
    const date = moment();
    const days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currDay = days[date.day()];
    const currMon = months[date.month()];
    const currTime = date.format("HH:mm:ss");
    return (
      <div>
        <Head>
          <title>Yudi Tan</title>

        </Head>
        <p id="welcome">
          Last login: {currDay} {currMon} {date.date()} {currTime} on ttys000
        </p>
        <p style={{ fontSize: 15 }}>
          Hello! I'm Yudi Tan and I'm currently doing my M.S. in Computer Science in UC Berkeley.
        </p>
        <p style={{ fontSize: 15 }}>
          I'm mainly interested in distributed systems, and in my free time, I enjoy building apps and doing photography. Feel free to reach out to me to chat about anything!
        </p>
        <pre>
          <code style={{ color: "#81CFDD" }}>
            {/* http://taylorkemper.com/assets/images/terminal-ascii-art/golang.txt */}
            {`
                                        \`.--://++++++++///::-.\`                                    
                               \`.:/+syhdmmmmmmmmmmmmmmmmmmmmmmmmmdhyo+:.                            
                          \`:+shddmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmddyo/.                       
                      \`:ohdmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdddddmmmmmmdho-      .--:-.\`       
       \`.::::-.    \`/ydmmmmdhyysssyydmmmmmmmmmmmmmmmmmmmmmmhsssssyyyyssssshmmmmdh+..shdddddddy/.    
    \`/ydddmmmddh--sdmmmdsssshdmmmmmdysssymmmmmmmmmmmmmmmhooymNMMMmdmNMMMNmyosmmmmmds/ymmmmmmmmmdo\`  
  \`+dmmmmmmmmms/ydmmmyosdNMMMMMdyyhNMMMNhosdmmmmmmmmmmdosmMMMMMh-\`\`\`.oNMMMMNh/hmmmmmdo/++oymmmmmmy\` 
 \`ymmmmdsooyh/sdmmmd+yNMMMMMMm-\`   .oMMMMMd/hmmmmmmmmh/dMMMMMMd\`      oMMMMMMN/ymmmmmmh-  \`ommmmmms 
 smmmmy.    :hmmmmd/dMMMMMMMM:       dMMMMMN/hmmmmmmh:NMMMMMMMd   /-  +MMMMMMMN:dmmmmmmd/  :mmmmmmm 
 dmmmm/    :dmmmmm/dMMMMMMMMM/  -o\` \`mMMMMMMm:mmmmmm/dMMMMMMMMMs.\`y+\`/NMMMMMMMMsommmmmmmd+-dmmmmmmh 
 ymmmmd/. :dmmmmmd:MMMMMMMMMMNo-/y-:dMMMMMMMM:dmmmmm.MMMMMMMMMMMNdhdmMMMMMMMMMMd/mmmmmmmmd:ymmmmmd- 
 .hmmmmms-dmmmmmmh/MMMMMMMMMMMMNmmmMMMMMMMMMM/hmmmmm.MMMMMMMMMMMMMMMMMMMMMMMMMMh/mmmmmmmmmh-dmmds.  
  \`+hmmd-hmmmmmmmd-MMMMMMMMMMMMMMMMMMMMMMMMMM-dmmmmmosMMMMMMMMMMMMMMMMMMMMMMMMM/ymmmmmmmmmmo+s/.    
    \`-+/+mmmmmmmmm+yMMMMMMMMMMMMMMMMMMMMMMMMsommmmmmd/hMMMMMMMMMMMMMMMMMMMMMMNoommmmmmmmmmmd.       
       \`dmmmmmmmmmd/hMMMMMMMMMMMMMMMMMMMMMNs+mmmmdddddosmMMMMMMMMMMMMMMMMMMMd+smmmmmmmmmmmmmo       
       +mmmmmmmmmmmdoomMMMMMMMMMMMMMMMMMNh+ymdy+:-.--:ososdNMMMMMMMMMMMMNmhosdmmmmmmmmmmmmmmd\`      
       hmmmmmmmmmmmmmhsohmNMMMMMMMMMNmdsoydmh-         \`ydyssyhddmmddhyssshmmmmmmmmmmmmmmmmmm/      
      \`mmmmmmmmmmmmmmmmdyysssyyyyysssyydmdhs:          \`:yhmmdhyyyyyyhdmmmmmmmmmmmmmmmmmmmmmmy      
      :mmmmmmmmmmmmmmmmmmmmmmdddddmmmmmmy/oyh+-.\`\`\`..:+yhyo+ydmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmd      
      /mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmh-hdddddddhhdddddddddo/dmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm-     
      +mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmo/dddddddddddddddddddd:ymmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm/     
      ommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmd:shhhhyoo+-sooshhddho/dmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmo     
      ommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmyo:oydNMh-MMMm+:oooymmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmms     
      +mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm-mMMMMs/MMMMh+mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmy     
      +mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm+yMMMMs/MMMMd/mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmh     
      :mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmd:dMMd/:dMMMoommmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmd     
      -mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmdsoosmdsoooymmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmd  `}
          </code>

        </pre>
        <OutsideClickHandler onOutsideClick={() => this._input.focus()}>
          <div>
            {this.state.pastCmds.map(c => (
              <div style={{ marginBottom: "10px" }}>
                <span id={c.valid ? "arrow" : "gitbranch"}>➜</span>
                <span id="dir"> ./yuditan.com</span> <span id="git">git:(</span>
                <span id="gitbranch">master</span>
                <span id="git">)</span> <span id="cross">✗</span>
                <span id={c.valid ? "correctCmd" : "gitbranch"}>{c.cmd}</span>
                <p>{c.output}</p>
              </div>
            ))}
            <div>
              <span id="arrow">➜</span>
              <span id="dir"> ./yuditan.com</span> <span id="git">git:(</span>
              <span id="gitbranch">master</span>
              <span id="git">)</span> <span id="cross">✗</span>
              <input
                autoComplete="off"
                autoFocus={true}
                ref={c => (this._input = c)}
                type="text"
                maxLength="8"
                id="cmd"
                value={this.state.currCmd}
                onChange={e => this.setState({ currCmd: e.target.value })}
                onKeyDown={this.newCmd}
              />
            </div>
          </div>
        </OutsideClickHandler>
      </div>
    );
  }
}

export default TerminalComponent;
