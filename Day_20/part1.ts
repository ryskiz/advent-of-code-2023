let lowCount = 0;
let highCount = 0;

const modules: { [key: string]: DestinationModule } = {};

type TPulse = "low" | "high";
type TModuleType = "flipFlop" | "conjunction";
type TQueueObject = { moduleName: string, pulseToSend: TPulse, origin: string | null }

const queue: TQueueObject[] = []

interface DestinationModule {
  children: string[];
  moduleName: string;
  state?: boolean;
  lastPulse?: TPulse;
  receivePulse: (pulse: TPulse, origin: string | null) => void;
  sendPulse: (pulse: TPulse) => void;
  getType: () => TModuleType;
  initInput?: (input: string) => void;
}

// State = on or off
// If received high frequency it does not do anything
class FlipFlopModule implements DestinationModule {
  public state: boolean;
  public moduleName: string;
  public children: string[];
  public parent: DestinationModule | null;
  constructor(moduleName: string, children: string[] = []) {
    this.moduleName = moduleName;
    this.state = false; // Indicates on or off, flip flops initially start as off
    this.children = children;
    this.parent = null;
  }

  receivePulse(pulse: TPulse) {
    if (pulse === "low") {
      this.state = !this.state;
      this.sendPulse(this.state ? "high" : "low");
    }
  }

  sendPulse(pulse: TPulse) {
    this.children.forEach((key) => {
      pulse === "low" ? (lowCount += 1) : (highCount += 1);
      queue.push({ moduleName: key, pulseToSend: pulse, origin: this.moduleName })
    });
  }

  getType(): TModuleType {
    return "flipFlop";
  }
}

// Remembers the pulse it received from each of it's modules
// Default to remembering off
// Only when ALL inputs are remembered as high will it send a LOW pulse
class ConjunctionModule implements DestinationModule {
  public lastPulse: TPulse;
  public moduleName: string;
  public children: string[];
  public inputs: { [key: string]: TPulse };
  constructor(moduleName: string, children: string[] = []) {
    this.lastPulse = "low";
    this.moduleName = moduleName;
    this.children = children;
    this.inputs = {};
  }

  receivePulse(pulse: TPulse, origin: string | null) {
    this.lastPulse = pulse;
    if (origin) this.inputs[origin] = pulse
    let nextPulse: TPulse = "low";
    const listeners = Object.values(this.inputs);
    for (let i = 0; i < listeners.length; i++) {
      if (listeners[i] === 'low') {
        nextPulse = 'high'
        break
      }
    }
    this.sendPulse(nextPulse);
  }

  sendPulse(pulse: TPulse) {
    this.children.forEach((key) => {
      pulse === "low" ? (lowCount += 1) : (highCount += 1);
      queue.push({ moduleName: key, pulseToSend: pulse, origin: this.moduleName })
    });
  }

  initInput(input: string) {
    this.inputs[input] = 'low';
  }

  getType(): TModuleType {
    return "conjunction";
  }
}

class Broadcaster {
  public children: string[];
  constructor(children: string[]) {
    this.children = children;
  }

  pushButton() {
    lowCount += 1; // pushing the button sends a low pulse to the broadcaster
    this.sendPulse();
  }

  sendPulse() {
    // Broadcaster will always send a low pulse
    this.children.forEach((key) => {
      lowCount += 1;
      queue.push({ moduleName: key, pulseToSend: 'low', origin: null })
    });
  }
}

const parseModules = () => {
  let broadcaster: Broadcaster | null = null;
  for (let i = 0; i < input.length; i++) {
    const [destModule, _, ...children] = input[i].replace(/,/g, "").split(" ");
    if (destModule === "broadcaster") {
      broadcaster = new Broadcaster(children);
      continue;
    }

    const isFlipFlop = destModule[0] === "%" ? true : false;
    if (isFlipFlop) {
      const [_, moduleName] = destModule.split("%");
      modules[moduleName] = new FlipFlopModule(moduleName, children);
    } else {
      const [_, moduleName] = destModule.split("&");
      modules[moduleName] = new ConjunctionModule(moduleName, children);
    }
  }

  return broadcaster;
};

const initConjunctions = () => {
  const modKeys = Object.keys(modules);
  for (let i = 0; i < modKeys.length; i++) {
    const modKey = modKeys[i];
    const mod = modules[modKey];
    const conjunctions = mod.children.filter(
      (child) => modules[child]?.getType?.() === "conjunction"
    );
    if (conjunctions.length) {
      conjunctions.forEach((key) => {
        modules[key].initInput?.(mod.moduleName);
      });
    }
  }
};

const sendButtonPulse = (broadcaster: Broadcaster) => {
  broadcaster.pushButton()
  while(queue.length) {
    const item = queue.shift()
    if (item) {
      const { moduleName, pulseToSend, origin } = item
      modules[moduleName]?.receivePulse(pulseToSend, origin);
    }
  }
}

const pressBroadcastButton = (numPulses: number) => {
  const broadcaster = parseModules();
  initConjunctions();

  if (!broadcaster) throw new Error("Cannot start without broadcaster");

  for (let i = 1; i <= numPulses; i++) {
    sendButtonPulse(broadcaster)
  }

  return lowCount * highCount;
};

console.log(pressBroadcastButton(1000));
