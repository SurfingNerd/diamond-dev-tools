import { ConfigManager } from '../configManager';
import { cmdR } from '../remoteCommand';
import { getNodesFromCliArgs } from './remotenetArgs';

async function run() {
  const nodes = await getNodesFromCliArgs();
  const installDir = ConfigManager.getRemoteInstallDir();
  const networkBranch = ConfigManager.getNetworkBranch();

  nodes.forEach((n) => {
    const nodeName = `hbbft${n.nodeID}`;
    console.log(`=== ${nodeName} ===`);
    
    // verify that the git remote exists
    cmdR(nodeName, `ls ~/${installDir}`);
    
    cmdR(nodeName, "cd ~/${installDir} && git checkout");
    //cmdR(nodeName, `cd ~/${installDir} && git checkout ${networkBranch} && git pull`);
  });
}

// todo find better command, this kind of hard kills it.
run();
