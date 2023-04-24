{
  description = "API for lunarbox";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/release-22.11";
    flake-utils.url = "github:numtide/flake-utils";
    extra-container.url = "github:erikarvstedt/extra-container";
    extra-container.inputs.nixpkgs.follows = "nixpkgs";
  };

  outputs = { self, nixpkgs, flake-utils, extra-container }:
    flake-utils.lib.eachSystem extra-container.lib.supportedSystems
      (system: {
        devShell =
          let pkgs = nixpkgs.legacyPackages.${system};
          in
          pkgs.mkShell {
            nativeBuildInputs = with pkgs; [
              nodejs
              yarn
            ];
          };
        packages.default = extra-container.lib.buildContainers {
          inherit system;

          config.containers.api-dev = {
            extra.addressPrefix = "10.250.0";

            config = { pkgs, ... }: {
              networking.firewall.allowedTCPPorts = [ 8090 ];

              # Taken from
              # - [the wiki](https://nixos.wiki/wiki/PostgreSQL)
              # - [my old config](https://github.com/Mateiadrielrafael/everything-nix/blob/v2.0.0/modules/applications/postgres.nix)
              services.postgresql = {
                enable = true;
                package = pkgs.postgresql_15;
                enableTCPIP = true;
                authentication = pkgs.lib.mkOverride 10 ''
                  local all all trust
                  host all all 127.0.0.1/32 trust
                  host all all ::1/128 trust
                '';
                initialScript = pkgs.writeText "backend-initScript" ''
                  CREATE ROLE adrielus WITH
                         LOGIN
                         SUPERUSER
                         INHERIT
                         CREATEDB
                         CREATEROLE
                         REPLICATION;
                  CREATE DATABASE lunarbox;
                  GRANT ALL PRIVILEGES ON DATABASE lunarbox TO adrielus;
                '';
              };

              environment.systemPackages = with pkgs; [ yarn nodejs ];

              systemd.services.lunarbox-api-dev = {
                wantedBy = [ "multi-user.target" ];
                script = ''
                  yarn install --frozen-lockfile
                  yarn dev
                '';
              };
            };
          };
        };
      });
}
