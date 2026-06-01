import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { SessionMetadata } from "./session-metadata.type";
import { UAParser } from "ua-parser-js";
import { lookup } from "geoip-lite";

@Injectable()
export class SessionMetadataService {
  extract(req: Request): SessionMetadata {
    const ip = this.extractIp(req);
    const geo = ip ? lookup(ip) : null;
    const {
      browser: { name: browserName },
      device: { type: deviceType, vendor, model },
      os: { name: osName },
    } = UAParser(req.headers["user-agent"]);

    return {
      ipAddress: ip,
      country: geo?.country ?? null,
      city: geo?.city ?? null,
      deviceType: deviceType || "desktop",
      deviceName: this.buildDeviceName(vendor, model, osName, deviceType),
      browserName: browserName || null,
      osName: osName || null,
    };
  }

  private buildDeviceName(
    vendor?: string,
    model?: string,
    osName?: string,
    deviceType?: string,
  ) {
    if (vendor && model) {
      return `${vendor} ${model}`;
    }

    if (!deviceType || deviceType === "desktop") {
      if (osName?.toLowerCase().includes("mac")) return "Mac";
      if (osName?.toLowerCase().includes("windows")) return "Windows PC";
      if (osName?.toLowerCase().includes("linux")) return "Linux PC";
      if (osName?.toLowerCase().includes("chrome")) return "Chromebook";
    }

    return null;
  }

  private extractIp(req: Request) {
    const forwarded = req.headers["x-forwarded-for"];

    if (forwarded) {
      const raw = Array.isArray(forwarded) ? forwarded[0] : forwarded;
      return raw.split(",")[0].trim();
    }

    return req.socket.remoteAddress ?? null;
  }
}
