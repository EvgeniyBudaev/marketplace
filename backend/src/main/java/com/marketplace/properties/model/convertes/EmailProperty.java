package com.marketplace.properties.model.convertes;

import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

@Getter
@Setter
public class EmailProperty {

    private String email;
    private String password;
    private OutgoingSmtpServer smtpServer;
    private IncomingServer incomingServer;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        EmailProperty that = (EmailProperty) o;

        return new EqualsBuilder().append(email, that.email).append(password, that.password).append(smtpServer, that.smtpServer).append(incomingServer, that.incomingServer).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(email).append(password).append(smtpServer).append(incomingServer).toHashCode();
    }
    @Override
    public String toString() {
        return "EmailProperty{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", smtpServer=" + smtpServer.toString() +
                ", incomingServer=" + incomingServer.toString() +
                '}';
    }


    @Getter
    @Setter
    public static class OutgoingSmtpServer{
        private String host;
        private Boolean enabledSSL;
        private Boolean enabledTLS;
        private Boolean requireAuth;
        private Integer portSSL;
        private Integer portTLS;
        private String transportProtocol;

        @Override
        public String toString() {
            return "OutgoingSmtpServer{" +
                    "host='" + host + '\'' +
                    ", enabledSSL=" + enabledSSL +
                    ", enabledTLS=" + enabledTLS +
                    ", requireAuth=" + requireAuth +
                    ", portSSL=" + portSSL +
                    ", portTLS=" + portTLS +
                    ", transportProtocol='" + transportProtocol + '\'' +
                    '}';
        }
    }

    @Getter
    @Setter
    public static class IncomingServer{
        private IncomingServerType serverType;
        private String imapServer;
        private Boolean enabledSSL;
        private Integer portSSL;
    }

    public enum IncomingServerType{
        IMAP,POP3
    }

}
