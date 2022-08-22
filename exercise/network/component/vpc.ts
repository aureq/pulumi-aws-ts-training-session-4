import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { Netmask } from "netmask";

// TODO: 12. Leverage `interface` for string typing
interface VpcArgs {
    ownerEmail: pulumi.Input<string>,
    cidrBlock: pulumi.Input<string>,
    subnetMask: pulumi.Input<string>,
    availabilityZone: pulumi.Input<string>,
}

export class Vpc extends pulumi.ComponentResource {

    private readonly name: string;
    private readonly args: VpcArgs;

    public readonly subnetId: pulumi.Output<string>;
    public readonly vpcId: pulumi.Output<string>;

    constructor(name: string, args: VpcArgs, opts?: pulumi.ComponentResourceOptions) {
        super("custom:resource:VPC", name, {}, opts);
        this.name = name;
        this.args = args;

        const vpcCidr = new Netmask(this.args.cidrBlock.toString());
        const subnetMask = this.args.subnetMask.toString();
        let subnetCidr = new Netmask(`${vpcCidr.base}/${subnetMask}`);


        const vpc = new aws.ec2.Vpc( `${this.name}-vpc`, {
            cidrBlock: ,                                            /* FIXME */
            instanceTenancy: "default",
            enableDnsHostnames: true,
            enableDnsSupport: true,
        }, {
            parent: this,
        });

        const igw = new aws.ec2.InternetGateway(`${this.name}-igw`, {
            vpcId: ,                                                /* FIXME */
        },{
            parent:                                                 /* FIXME */
        });

        const routeTable = new aws.ec2.RouteTable(`${this.name}-rt`, {
            vpcId: ,                                                /* FIXME */
            routes: [{
                cidrBlock: '0.0.0.0/0',
                gatewayId:                                          /* FIXME */
            }],
            }, {
                parent:                                             /* FIXME */
        });

        const subnetCidrBlock = `${subnetCidr.base}/${subnetCidr.bitmask}`;

        const pubSubnet = new aws.ec2.Subnet(`${this.name}-subnet`, {
                                                                    /* FIXME */
            assignIpv6AddressOnCreation: false,
            mapPublicIpOnLaunch: true,
            availabilityZone: this.args.availabilityZone,
        }, {
            parent:                                                 /* FIXME */
        });

        this.subnetId = ;                                           /* FIXME */

        const routeTableAssoc = new aws.ec2.RouteTableAssociation(`${this.name}-public-rt-assoc`, {
                                                                    /* FIXME */
        }, {
            parent: routeTable
        });

        this.vpcId = ;                                              /* FIXME */

    }
}