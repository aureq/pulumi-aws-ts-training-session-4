import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as crVpc from "./component/vpc";
import * as taggable from "./taggable";

const config = new pulumi.Config();
const ownerEmail = config.get("ownerEmail") || "unassigned@acmecorp.com";

export = async () => {

    /**
     * Here is how to create an array in your stack config
     * pulumi config set --path regions[0] 'ap-southeast-1'
     * pulumi config set --path regions[1] 'ap-southeast-2'
     */
    const regions: Array<aws.Region> = config.requireObject("regions");

    // FIXME: As above
    const availabilityZones: Array<string> = config.requireObject("availabilityZones");

    // FIXME: As above
    const cidrBlocks: Array<string> = config.requireObject("cidrBlocks");

    // FIXME: As above
    const subnetMasks: Array<string> = config.requireObject("netmasks");

    const publicSubnets: pulumi.Output<string>[] = [];
    const vpcs: pulumi.Output<string>[] = [];

    // TODO: 3. Loop over the configured regions
    for (let x = 0; x < regions.length; x++) {

        const regionName = regions[x];
        const availabilityZone = availabilityZones[x];
        const cidrBlock = cidrBlocks[x];
        const subnetMask = subnetMasks[x];

        pulumi.log.info(`Region: ${regionName}`)

        const awsProvider = new aws.Provider(`${regionName}-provider`, {
            region: regionName,
        });

        const vpc = new crVpc.Vpc(`${regionName}-vpc-component`, {
            cidrBlock: cidrBlock,
            subnetMask: subnetMask,
            ownerEmail: ownerEmail,
            availabilityZone: availabilityZone,
        }, {
            // TODO: 2. make use of programmatic providers
            provider: awsProvider,

            // TODO: 4. apply tags to the entire component resource sub resources
            transformations: [args => {
                if (taggable.isTaggable(args.type)) {

                    args.props["tags"] = { ...args.props["tags"], ...{ owner: /* FIXME */ }};
                    return {
                        props: args.props,
                        opts: args.opts,
                    }
                }
                return undefined;
            }],
        });

        publicSubnets[x] = vpc.subnetId;
        vpcs[x] = vpc.vpcId;
    }

    return {
        regions: regions,
        vpcs: vpcs,
        publicSubnets: publicSubnets,
    }
}