package com.smhrd.namnam.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "admission_info")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AdmissionInfo {

    // -- 한 입원 코드에 대한 기본 정보 --

    // 입원 식별자
    @Id
    @Column(name = "admission_id", length = 30)
    private String admissionId;

    // PatientInfo의 환자 식별자
    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "patient_id", nullable = false)
    private PatientInfo patientInfo;

    // 입원 여부
    @Column(name = "admission_state", nullable = false, length = 10)
    private String admissionState;

    // 도착 시간
    @Column(name = "admission_in_time")
    private Timestamp admissionInTime;

    // 퇴원 시간
    @Column(name = "admission_out_time")
    private Timestamp admissionOutTime;

    // 등록 일자
    @UpdateTimestamp
    @Column(name = "admission_created_at", nullable = false)
    private Timestamp admissionCreatedAt;

    // 실제 배치 결과
    @Column(name = "admission_result_ward", length = 20)
    private String admissionResultWard;

}
